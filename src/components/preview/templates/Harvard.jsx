import React from 'react';

const Harvard = ({ resume }) => {
  if (!resume) return null;
  const projects = resume.projects || [];

  return (
    <div id="resume-preview" className="bg-white p-8 w-[210mm] min-h-[297mm] text-black font-serif leading-tight">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold uppercase tracking-tight mb-0.5">{resume.name}</h1>
        <div className="text-[10px] space-x-2">
          <span>{resume.title}</span>
          {resume.email && <span>• {resume.email}</span>}
          {resume.phone && <span>• {resume.phone}</span>}
          {resume.location && <span>• {resume.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase border-b border-black mb-1">Professional Summary</h2>
          <p className="text-[10px] leading-normal text-justify">{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase border-b border-black mb-2">Professional Experience</h2>
          <div className="space-y-3">
            {resume.experience.map((exp, i) => (
              <div key={exp.id || i} className="experience-item">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11px]">{exp.company}</span>
                  <span className="text-[10px] font-bold">{exp.duration}</span>
                </div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-[10px] italic font-bold">{exp.title}</span>
                </div>
                <p className="text-[10px] leading-snug text-justify whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase border-b border-black mb-2">Academic & Personal Projects</h2>
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div key={proj.id || i} className="project-item">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-[11px]">{proj.title}</span>
                  <span className="text-[10px] font-bold">{proj.duration}</span>
                </div>
                <p className="text-[10px] leading-snug text-justify whitespace-pre-line">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase border-b border-black mb-1">Technical Skills & Interests</h2>
          <p className="text-[10px]">
            <span className="font-bold">Skills: </span>
            {resume.skills.filter(s => s).join(', ')}
          </p>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-[11px] font-bold uppercase border-b border-black mb-2">Education</h2>
          <div className="space-y-2">
            {resume.education.map((edu, i) => (
              <div key={edu.id || i} className="education-item">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[11px]">{edu.institution}</span>
                  <span className="text-[10px] font-bold">{edu.duration}</span>
                </div>
                <div className="text-[10px] italic font-bold">{edu.degree}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Harvard;
