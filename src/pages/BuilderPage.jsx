import React, { useState, useEffect, useCallback, useRef } from 'react';
import Form from '../components/builder/Form';
import Resume from '../components/preview/Resume';
import AnalyzerModal from '../components/builder/AnalyzerModal';
import { analyzeResumeWithAI, enhanceTextWithAI, parseResumeWithAI } from '../utils/ai';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import ImportModal from '../components/builder/ImportModal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EMPTY_RESUME = {
  name: '',
  title: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: []
};

const BuilderPage = () => {
  const [resume, setResume] = useState(EMPTY_RESUME);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isAILoading, setIsAILoading] = useState(null); // Now stores the ID of the field being polished
  const [isAnalyzerLoading, setIsAnalyzerLoading] = useState(false);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [analysis, setAnalysis] = useState({ score: 0, feedback: [] });
  const [jobDescription, setJobDescription] = useState('');

  // --- Resizable Panes ---
  const [leftWidth, setLeftWidth] = useState(50);
  const isResizing = useRef(false);
  const containerRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.min(Math.max(newWidth, 25), 75));
    };
    const handleMouseUp = () => {
      if (isResizing.current) {
        isResizing.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleStartFresh = () => {
    setResume(EMPTY_RESUME);
    setIsStarted(true);
  };

  const handleImport = async (text) => {
    setIsImporting(true);
    try {
      const parsedResume = await parseResumeWithAI(text);
      setResume({ ...EMPTY_RESUME, ...parsedResume, projects: parsedResume.projects || [] });
      setIsImportModalOpen(false);
      setIsStarted(true);
    } catch (error) {
      alert("Magic Import failed. Please try again.");
      console.error(error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzerLoading(true);
    setAnalysis({ score: 0, feedback: [] }); // Reset to show progress
    try {
      const result = await analyzeResumeWithAI(resume, jobDescription);
      setAnalysis(result);
      setIsAnalyzerOpen(true);
    } catch (error) {
      alert("AI Analysis failed. Make sure you have added a valid Groq API Key to your .env file.");
      console.error(error);
    } finally {
      setIsAnalyzerLoading(false);
    }
  };

  const handleAIEnhance = async (section, index, field, currentText) => {
    if (!currentText) return;
    const loadingId = section === 'summary' ? 'summary' : `${section}-${index}-${field}`;
    setIsAILoading(loadingId);
    try {
      const enhancedText = await enhanceTextWithAI(currentText, field, jobDescription);
      setResume(prev => {
        if (section === 'summary') {
          return { ...prev, summary: enhancedText };
        }
        const updatedSection = [...prev[section]];
        updatedSection[index] = { ...updatedSection[index], [field]: enhancedText };
        return { ...prev, [section]: updatedSection };
      });
    } catch (error) {
      console.error("AI Enhancement failed:", error);
    } finally {
      setIsAILoading(null);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setResume(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleNestedChange = useCallback((section, index, e) => {
    const { name, value } = e.target;
    setResume(prev => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      return { ...prev, [section]: updatedSection };
    });
  }, []);

  const addSectionItem = useCallback((section) => {
    const newId = Date.now().toString();
    setResume(prev => {
      if (section === 'skills') {
        return { ...prev, skills: [...prev.skills, ''] };
      }
      if (section === 'projects') {
        return { ...prev, projects: [...prev.projects, { id: newId, title: '', duration: '', description: '' }] };
      }
      return { ...prev, [section]: [...prev[section], { id: newId }] };
    });
  }, []);

  const removeSectionItem = useCallback((section, index) => {
    setResume(prev => {
      const updatedSection = [...prev[section]];
      updatedSection.splice(index, 1);
      return { ...prev, [section]: updatedSection };
    });
  }, []);

  const handleSkillChange = useCallback((index, e) => {
    const value = e.target.value;
    setResume(prev => {
      const newSkills = [...prev.skills];
      newSkills[index] = value;
      return { ...prev, skills: newSkills };
    });
  }, []);

  const downloadPDF = () => {
    // We use window.print() because html2canvas currently crashes on Tailwind v4 "oklch" colors.
    // Our index.css @media print rules are optimized to make this look perfect.
    window.print();
  };

  const downloadWord = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({ children: [new TextRun({ text: resume.name, bold: true, size: 32 })] }),
          new Paragraph({ children: [new TextRun({ text: resume.title, size: 24 })] }),
          new Paragraph({ text: resume.summary }),
          new Paragraph({ text: 'Skills', heading: 'Heading1' }),
          ...resume.skills.map(skill => new Paragraph({ text: skill, bullet: { level: 0 } })),
          new Paragraph({ text: 'Experience', heading: 'Heading1' }),
          ...resume.experience.flatMap(exp => [
            new Paragraph({ children: [new TextRun({ text: exp.title || '', bold: true })] }),
            new Paragraph({ children: [new TextRun(exp.company || '')] }),
            new Paragraph({ children: [new TextRun(exp.duration || '')] }),
            new Paragraph({ text: exp.description || '' }),
          ]),
          new Paragraph({ text: 'Education', heading: 'Heading1' }),
          ...resume.education.flatMap(edu => [
            new Paragraph({ children: [new TextRun({ text: edu.degree || '', bold: true })] }),
            new Paragraph({ children: [new TextRun(edu.institution || '')] }),
            new Paragraph({ children: [new TextRun(edu.duration || '')] }),
          ]),
          ...(resume.projects && resume.projects.length > 0 ? [
            new Paragraph({ text: 'Projects', heading: 'Heading1' }),
            ...resume.projects.flatMap(proj => [
              new Paragraph({ children: [new TextRun({ text: proj.title || '', bold: true })] }),
              new Paragraph({ children: [new TextRun(proj.duration || '')] }),
              new Paragraph({ text: proj.description || '' }),
            ]),
          ] : []),
        ],
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "resume.docx");
    });
  };

  const handleResetWorkspace = () => {
    setResume(EMPTY_RESUME);
    setIsStarted(false);
  };

  // --- Onboarding Screen ---
  if (!isStarted) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-zinc-950 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
              Ephemeral <span className="text-emerald-500">Builder</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              No data is saved. Import, polish, and download your resume instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              onClick={() => setIsImportModalOpen(true)}
              className="group relative p-1 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500"></div>
              <div className="relative p-10 space-y-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-zinc-950 rounded-2xl flex items-center justify-center text-4xl shadow-2xl border border-zinc-800 group-hover:scale-110 transition-transform duration-500">
                  🪄
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Magic Import</h3>
                  <p className="text-zinc-500 text-sm mt-2 font-medium">Upload PDF/Word and let AI do the heavy lifting</p>
                </div>
              </div>
            </button>

            <button 
              onClick={handleStartFresh}
              className="group relative p-1 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500"></div>
              <div className="relative p-10 space-y-6 flex flex-col items-center">
                <div className="w-20 h-20 bg-zinc-950 rounded-2xl flex items-center justify-center text-4xl shadow-2xl border border-zinc-800 group-hover:scale-110 transition-transform duration-500">
                  ✍️
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Start Fresh</h3>
                  <p className="text-zinc-500 text-sm mt-2 font-medium">Build your professional identity from a blank canvas</p>
                </div>
              </div>
            </button>
          </div>

          <ImportModal 
            isOpen={isImportModalOpen} 
            onClose={() => setIsImportModalOpen(false)} 
            onImport={handleImport}
            isLoading={isImporting}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex h-[calc(100vh-64px)] bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 overflow-hidden">
      <div style={{ width: `${leftWidth}%` }} className="h-full overflow-y-auto no-print flex-shrink-0">
        <Form 
          resume={resume} 
          handleInputChange={handleInputChange}
          handleNestedChange={handleNestedChange}
          addSectionItem={addSectionItem}
          removeSectionItem={removeSectionItem}
          handleSkillChange={handleSkillChange}
          handleAIEnhance={handleAIEnhance}
          isAILoading={isAILoading}
          downloadPDF={downloadPDF}
          downloadWord={downloadWord}
          handleAnalyze={handleAnalyze}
          isAnalyzerLoading={isAnalyzerLoading}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onImportClick={() => setIsImportModalOpen(true)}
          onResetWorkspace={handleResetWorkspace}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />
      </div>

      <div 
        onMouseDown={handleMouseDown}
        className="w-2 flex-shrink-0 bg-zinc-900 hover:bg-emerald-500/40 active:bg-emerald-500/60 cursor-col-resize transition-colors duration-200 relative group no-print"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-10 bg-zinc-700 group-hover:bg-emerald-400 rounded-full transition-colors"></div>
      </div>

      <div style={{ width: `${100 - leftWidth}%` }} className="h-full overflow-y-auto bg-zinc-900/20 p-8 flex justify-center items-start flex-shrink-0">
        <div id="resume-preview-container">
           <Resume resume={resume} template={selectedTemplate} />
        </div>
      </div>

      <AnalyzerModal 
        isOpen={isAnalyzerOpen} 
        onClose={() => setIsAnalyzerOpen(false)} 
        analysis={analysis} 
      />
      <ImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setIsImportModalOpen(false)} 
        onImport={handleImport}
        isLoading={isImporting}
      />
    </div>
  );
};

export default BuilderPage;
