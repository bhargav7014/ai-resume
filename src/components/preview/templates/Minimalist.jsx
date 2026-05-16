import React from 'react';

const Minimalist = ({ resume }) => {
  if (!resume) return null;
  const projects = resume.projects || [];

  return (
    <div id="resume-preview" className="bg-white p-8 w-[210mm] min-h-[297mm] text-zinc-900 font-sans leading-snug">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">{resume.name}</h1>
        <div className="flex gap-4 text-xs text-zinc-500 font-medium">
          <span className="text-zinc-900 font-bold">{resume.title}</span>
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <p className="text-[11px] leading-relaxed text-zinc-600 border-l-2 border-zinc-100 pl-4 italic">{resume.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Experience</h2>
          <div className="space-y-4">
            {resume.experience.map((exp, i) => (
              <div key={exp.id || i} className="experience-item">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[13px] font-bold">{exp.title}</h3>
                  <span className="text-[10px] text-zinc-400 font-bold">{exp.duration}</span>
                </div>
                <div className="text-[11px] text-zinc-500 mb-1 font-bold">{exp.company}</div>
                <p className="text-[10px] text-zinc-600 leading-relaxed whitespace-pre-line text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div key={proj.id || i} className="project-item">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[13px] font-bold">{proj.title}</h3>
                  <span className="text-[10px] text-zinc-400 font-bold">{proj.duration}</span>
                </div>
                <p className="text-[10px] text-zinc-600 leading-relaxed whitespace-pre-line text-justify">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {resume.skills.filter(s => s).map((skill, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                <span className="text-[10px] font-bold text-zinc-700">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <section>
          <h2 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Education</h2>
          <div className="space-y-3">
            {resume.education.map((edu, i) => (
              <div key={edu.id || i} className="flex justify-between items-baseline education-item">
                <div>
                  <div className="text-[11px] font-bold">{edu.degree}</div>
                  <div className="text-[10px] text-zinc-500 font-bold">{edu.institution}</div>
                </div>
                <span className="text-[10px] text-zinc-400 font-bold">{edu.duration}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Minimalist;
