import React from 'react';

const Form = ({
  resume,
  handleInputChange,
  handleNestedChange,
  addSectionItem,
  removeSectionItem,
  handleSkillChange,
  handleAIEnhance,
  isAILoading,
  downloadPDF,
  downloadWord,
  handleAnalyze,
  isAnalyzerLoading,
  selectedTemplate,
  setSelectedTemplate,
  onImportClick,
  onResetWorkspace,
  jobDescription,
  setJobDescription
}) => {
  return (
    <section className="text-zinc-400 bg-zinc-950 body-font relative w-full">
      <div className="container px-6 py-12 mx-auto">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Template Style</label>
                <select 
                  value={selectedTemplate} 
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-100 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block px-4 py-2.5 transition-all outline-none cursor-pointer hover:bg-zinc-900"
                >
                  <optgroup label="Standard" className="bg-zinc-900 text-zinc-500">
                    <option value="modern">Modern Professional</option>
                    <option value="classic">Classic Minimal</option>
                    <option value="creative">Creative Bold</option>
                  </optgroup>
                  <optgroup label="ATS Optimized (Recommended)" className="bg-zinc-900 text-emerald-500">
                    <option value="harvard">Harvard Standard</option>
                    <option value="tech">Tech Focused</option>
                    <option value="minimalist">Linear Minimalist</option>
                  </optgroup>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Quick Start</label>
                <button 
                  type="button"
                  onClick={onImportClick}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-xl px-5 py-2.5 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 flex items-center gap-2 group"
                >
                  <span className="group-hover:animate-pulse">🪄</span>
                  Magic Import
                </button>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">Workspace</label>
                <button 
                  type="button"
                  onClick={onResetWorkspace}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-xl px-5 py-2.5 transition-all hover:border-red-500/50 hover:bg-red-500/5 flex items-center gap-2 group"
                >
                  <span className="group-hover:animate-pulse">🔄</span>
                  Reset
                </button>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={handleAnalyze}
              disabled={isAnalyzerLoading}
              className={`px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl flex items-center gap-3 transition-all shadow-lg shadow-emerald-900/20 active:scale-95 ${isAnalyzerLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAnalyzerLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  AI Analyzing...
                </>
              ) : (
                <>
                  <span className="text-xl">🎯</span>
                  {jobDescription ? 'Match with Job Description' : 'Analyze Resume Score'}
                </>
              )}
            </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="w-full mx-auto space-y-12">
          {/* Target Job Description */}
          <div className="space-y-4 bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl">
            <div className="flex justify-between items-center px-1">
              <label htmlFor="jobDescription" className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em]">🎯 Target Job Description (Optional)</label>
              <div className="text-[9px] font-bold text-emerald-500/50 uppercase tracking-widest">AI will optimize for these keywords</div>
            </div>
            <textarea 
              id="jobDescription" 
              value={jobDescription} 
              onChange={(e) => setJobDescription(e.target.value)} 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 px-4 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all h-32 resize-none text-sm" 
              placeholder="Paste the job description here to get a tailored ATS score and AI keyword matching..."
            ></textarea>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
              <input type="text" id="name" name="name" value={resume.name} onChange={handleInputChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="title" className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">Professional Title</label>
              <input type="text" id="title" name="title" value={resume.title} onChange={handleInputChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all" placeholder="Senior Software Engineer" />
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label htmlFor="summary" className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">Professional Summary</label>
              <button 
                type="button" 
                onClick={() => handleAIEnhance('summary', null, 'summary', resume.summary)} 
                disabled={isAILoading === 'summary'} 
                className="text-[10px] flex items-center gap-1.5 text-emerald-500 hover:text-emerald-400 transition-colors font-black uppercase tracking-widest disabled:opacity-50"
              >
                {isAILoading === 'summary' ? (
                  <div className="w-3 h-3 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                ) : (
                  <span className="text-sm">✨</span>
                )}
                {isAILoading === 'summary' ? 'Polishing...' : `AI Polish ${jobDescription ? "& Target" : ""}`}
              </button>
            </div>
            <textarea id="summary" name="summary" value={resume.summary} onChange={handleInputChange} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 px-4 text-zinc-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all h-32 resize-none" placeholder="Briefly describe your career journey..."></textarea>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
               <h2 className="text-xl font-bold text-white tracking-tight">Skills</h2>
               <button type="button" onClick={() => addSectionItem('skills')} className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">+ Add Skill</button>
            </div>
            <div className="flex flex-wrap gap-3">
                {resume.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 pl-3 rounded-xl group transition-all hover:border-zinc-700">
                        <input type="text" value={skill} onChange={(e) => handleSkillChange(index, e)} className="bg-transparent text-zinc-100 text-sm outline-none w-24 focus:w-40 transition-all" placeholder="Skill"/>
                        <button type="button" onClick={() => removeSectionItem('skills', index)} className="p-1.5 text-zinc-600 hover:text-emerald-500 transition-colors">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
               <h2 className="text-xl font-bold text-white tracking-tight">Work Experience</h2>
               <button type="button" onClick={() => addSectionItem('experience')} className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">+ Add Position</button>
            </div>
            <div className="space-y-6">
              {resume.experience.map((exp, index) => (
                <div key={exp.id || index} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl relative group">
                  <button type="button" onClick={() => removeSectionItem('experience', index)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" name="title" placeholder="Job Title" value={exp.title || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-sm outline-none focus:border-emerald-500" />
                    <input type="text" name="company" placeholder="Company Name" value={exp.company || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-sm outline-none focus:border-emerald-500" />
                  </div>
                  <div className="mb-4">
                    <input type="text" name="duration" placeholder="Duration (e.g. 2021 - Present)" value={exp.duration || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-sm outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Responsibilities</label>
                      <button 
                        type="button" 
                        onClick={() => handleAIEnhance('experience', index, 'description', exp.description)} 
                        disabled={isAILoading === `experience-${index}-description`} 
                        className="text-[10px] text-emerald-500 hover:text-emerald-400 font-black uppercase tracking-widest flex items-center gap-1 disabled:opacity-50"
                      >
                        {isAILoading === `experience-${index}-description` ? (
                          <div className="w-3 h-3 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                        ) : (
                          <span className="text-xs">✨</span>
                        )}
                        {isAILoading === `experience-${index}-description` ? 'Optimizing...' : `AI Optimize ${jobDescription ? "& Target" : ""}`}
                      </button>
                    </div>
                    <textarea name="description" value={exp.description || ''} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 text-sm outline-none focus:border-emerald-500 h-24 resize-none" placeholder="Describe your key achievements..."></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
               <h2 className="text-xl font-bold text-white tracking-tight">Education</h2>
               <button type="button" onClick={() => addSectionItem('education')} className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">+ Add Degree</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resume.education.map((edu, index) => (
                <div key={edu.id || index} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl relative group">
                  <button type="button" onClick={() => removeSectionItem('education', index)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <input type="text" name="degree" placeholder="Degree Name" value={edu.degree || ''} onChange={(e) => handleNestedChange('education', index, e)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 mb-3 text-zinc-100 text-sm outline-none focus:border-emerald-500 font-bold" />
                  <div className="grid grid-cols-1 gap-3">
                    <input type="text" name="institution" placeholder="Institution" value={edu.institution || ''} onChange={(e) => handleNestedChange('education', index, e)} className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-sm outline-none focus:border-emerald-500" />
                    <input type="text" name="duration" placeholder="Year" value={edu.duration || ''} onChange={(e) => handleNestedChange('education', index, e)} className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-sm outline-none focus:border-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects / Additional Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
               <h2 className="text-xl font-bold text-white tracking-tight">Projects & Additional Info</h2>
               <button type="button" onClick={() => addSectionItem('projects')} className="text-xs font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">+ Add Project</button>
            </div>
            <div className="space-y-6">
              {(resume.projects || []).map((proj, index) => (
                <div key={proj.id || index} className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl relative group">
                  <button type="button" onClick={() => removeSectionItem('projects', index)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input type="text" name="title" placeholder="Project Title" value={proj.title || ''} onChange={(e) => handleNestedChange('projects', index, e)} className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-sm outline-none focus:border-emerald-500 font-bold" />
                    <input type="text" name="duration" placeholder="Date / Duration" value={proj.duration || ''} onChange={(e) => handleNestedChange('projects', index, e)} className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-100 text-sm outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Description</label>
                      <button 
                        type="button" 
                        onClick={() => handleAIEnhance('projects', index, 'description', proj.description)} 
                        disabled={isAILoading === `projects-${index}-description`} 
                        className="text-[10px] text-emerald-500 hover:text-emerald-400 font-black uppercase tracking-widest flex items-center gap-1 disabled:opacity-50"
                      >
                        {isAILoading === `projects-${index}-description` ? (
                          <div className="w-3 h-3 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                        ) : (
                          <span className="text-xs">✨</span>
                        )}
                        {isAILoading === `projects-${index}-description` ? 'Optimizing...' : `AI Optimize ${jobDescription ? "& Target" : ""}`}
                      </button>
                    </div>
                    <textarea name="description" value={proj.description || ''} onChange={(e) => handleNestedChange('projects', index, e)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 text-sm outline-none focus:border-emerald-500 h-24 resize-none" placeholder="Describe the project, technologies used, and impact..."></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Actions */}
          <div className="pt-12 border-t border-zinc-800 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              type="button" 
              onClick={downloadPDF} 
              className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-xl shadow-emerald-900/30 flex items-center gap-2 justify-center"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
               Download PDF
            </button>
            <button type="button" onClick={downloadWord} className="px-12 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black rounded-xl transition-all flex items-center gap-2 justify-center">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               Export DOCX
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
