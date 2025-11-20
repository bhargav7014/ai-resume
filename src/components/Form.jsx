import React, { useState } from 'react';
import { db } from '../utils/db';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

const Form = () => {
  const [resume, setResume] = useState(db.resumes[0]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResume({ ...resume, [name]: value });
  };

  const handleNestedChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedSection = [...resume[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: value };
    setResume({ ...resume, [section]: updatedSection });
  };

  const addSectionItem = (section) => {
    const newId = new Date().getTime().toString(); // simple unique id
    const newItem = section === 'skills' ? '' : { id: newId };
    setResume({ ...resume, [section]: [...resume[section], newItem] });
  };

  const removeSectionItem = (section, index) => {
    const updatedSection = [...resume[section]];
    updatedSection.splice(index, 1);
    setResume({ ...resume, [section]: updatedSection });
  };

    const handleSkillChange = (index, e) => {
        const newSkills = [...resume.skills];
        newSkills[index] = e.target.value;
        setResume({ ...resume, skills: newSkills });
    };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Resume:', resume);
    alert('Resume updated! Check the console for the new data.');
  };

  const downloadPDF = () => {
    const input = document.getElementById('resume-form');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("resume.pdf");
      });
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
            new Paragraph({ children: [new TextRun({ text: exp.title, bold: true })] }),
            new Paragraph({ children: [new TextRun(exp.company)] }),
            new Paragraph({ children: [new TextRun(exp.duration)] }),
            new Paragraph({ text: exp.description }),
          ]),
          new Paragraph({ text: 'Education', heading: 'Heading1' }),
          ...resume.education.flatMap(edu => [
            new Paragraph({ children: [new TextRun({ text: edu.degree, bold: true })] }),
            new Paragraph({ children: [new TextRun(edu.institution)] }),
            new Paragraph({ children: [new TextRun(edu.duration)] }),
          ]),
        ],
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "resume.docx");
    });
  };


  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div id="resume-form" className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Resume Builder</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Update your resume details below.</p>
        </div>
        <form onSubmit={handleSubmit} className="lg:w-2/3 md:w-full mx-auto">
          <div className="flex flex-wrap -m-2">
            {/* Basic Info */}
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm text-gray-400">Name</label>
                <input type="text" id="name" name="name" value={resume.name} onChange={handleInputChange} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="title" className="leading-7 text-sm text-gray-400">Title</label>
                <input type="text" id="title" name="title" value={resume.title} onChange={handleInputChange} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 focus:ring-2 focus:ring-green-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="summary" className="leading-7 text-sm text-gray-400">Summary</label>
                <textarea id="summary" name="summary" value={resume.summary} onChange={handleInputChange} className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
            </div>

            {/* Skills */}
            <div className="p-2 w-full">
                <h2 class="text-white text-lg mb-2">Skills</h2>
                {resume.skills.map((skill, index) => (
                    <div key={index} class="flex items-center mb-2">
                        <input type="text" value={skill} onChange={(e) => handleSkillChange(index, e)} class="w-full bg-gray-800 rounded border border-gray-700 p-2 text-white"/>
                        <button type="button" onClick={() => removeSectionItem('skills', index)} class="ml-2 bg-red-500 text-white p-2 rounded">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => addSectionItem('skills')} class="bg-blue-500 text-white p-2 rounded mt-2">Add Skill</button>
            </div>


            {/* Experience */}
            <div className="p-2 w-full">
              <h2 className="text-white text-lg mb-2">Experience</h2>
              {resume.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 mb-2 border border-gray-700 rounded">
                  <input type="text" name="title" placeholder="Title" value={exp.title} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full bg-gray-800 rounded border border-gray-700 p-2 mb-2 text-white" />
                  <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full bg-gray-800 rounded border border-gray-700 p-2 mb-2 text-white" />
                  <input type="text" name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full bg-gray-800 rounded border border-gray-700 p-2 mb-2 text-white" />
                  <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleNestedChange('experience', index, e)} className="w-full bg-gray-800 rounded border border-gray-700 p-2 text-white"></textarea>
                  <button type="button" onClick={() => removeSectionItem('experience', index)} className="bg-red-500 text-white p-2 rounded mt-2">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addSectionItem('experience')} className="bg-blue-500 text-white p-2 rounded mt-2">Add Experience</button>
            </div>

            {/* Education */}
            <div className="p-2 w-full">
              <h2 className="text-white text-lg mb-2">Education</h2>
              {resume.education.map((edu, index) => (
                <div key={edu.id} className="p-4 mb-2 border border-gray-700 rounded">
                  <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedChange('education', index, e)} className="w-full bg-gray-800 rounded border border-gray-700 p-2 mb-2 text-white" />
                  <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleNestedChange('education', index, e)} className="w-full bg-gray-800 rounded border border-gray-700 p-2 mb-2 text-white" />
                  <input type="text" name="duration" placeholder="Duration" value={edu.duration} onChange={(e) => handleNestedChange('education', index, e)} className="w-full bg-gray-800 rounded border border-gray-700 p-2 mb-2 text-white" />
                  <button type="button" onClick={() => removeSectionItem('education', index)} className="bg-red-500 text-white p-2 rounded mt-2">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => addSectionItem('education')} className="bg-blue-500 text-white p-2 rounded mt-2">Add Education</button>
            </div>

            <div className="p-2 w-full mt-4">
              <button type="submit" className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Update Resume</button>
              <button type="button" onClick={downloadPDF} className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg mt-4">Download PDF</button>
              <button type="button" onClick={downloadWord} className="flex mx-auto text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg mt-4">Download Word</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Form;
