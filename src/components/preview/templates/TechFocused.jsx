import React from 'react';

const TechFocused = ({ resume }) => {
  if (!resume) return null;
  const projects = resume.projects || [];

  return (
    <div id="resume-preview" className="bg-white p-8 w-[210mm] min-h-[297mm] text-slate-800 font-sans leading-tight">
      {/* Header */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-slate-200 pb-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-1 uppercase">{resume.name}</h1>
          <h2 className="text-lg font-bold text-emerald-600 uppercase tracking-widest">{resume.title}</h2>
        </div>
        <div className="text-right text-[10px] text-slate-500 font-bold space-y-1 uppercase tracking-widest">
          {resume.email && <div>{resume.email}</div>}
          {resume.phone && <div>{resume.phone}</div>}
          {resume.location && <div>{resume.location}</div>}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {resume.skills.length > 0 && (
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Technical Stack</h3>
              <div className="flex flex-col gap-2">
                {resume.skills.filter(s => s).map((skill, i) => (
                  <span key={i} className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border-b border-slate-200">{skill}</span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Education</h3>
              <div className="space-y-3">
                {resume.education.map((edu, i) => (
                  <div key={edu.id || i} className="education-item">
                    <div className="text-[10px] font-black text-slate-900 leading-tight mb-0.5">{edu.degree}</div>
                    <div className="text-[9px] text-slate-500 font-bold">{edu.institution}</div>
                    <div className="text-[9px] text-emerald-600 font-black mt-0.5">{edu.duration}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-3 space-y-6">
          {/* Summary */}
          {resume.summary && (
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">About Me</h3>
              <p className="text-[11px] leading-relaxed text-slate-600 text-justify">{resume.summary}</p>
            </section>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Work Experience</h3>
              <div className="space-y-4">
                {resume.experience.map((exp, i) => (
                  <div key={exp.id || i} className="relative pl-4 border-l border-slate-200 experience-item">
                    <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full bg-emerald-500"></div>
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-[13px] font-black text-slate-900 uppercase tracking-tight">{exp.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold">{exp.duration}</span>
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600 mb-1">{exp.company}</div>
                    <p className="text-[10px] text-slate-600 leading-relaxed text-justify whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Featured Projects</h3>
              <div className="grid grid-cols-2 gap-3">
                {projects.map((proj, i) => (
                  <div key={proj.id || i} className="bg-slate-50 p-3 rounded-lg border border-slate-100 project-item">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <h4 className="text-[10px] font-black text-slate-900 uppercase">{proj.title}</h4>
                      <span className="text-[9px] text-slate-400 font-bold">{proj.duration}</span>
                    </div>
                    <p className="text-[9px] text-slate-600 leading-relaxed text-justify line-clamp-4">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechFocused;
