import React from 'react'
import Harvard from './templates/Harvard'
import TechFocused from './templates/TechFocused'
import Minimalist from './templates/Minimalist'

const Resume = ({ resume, template = 'modern' }) => {
  if (!resume) return null;

  const projects = resume.projects || [];

  const renderModern = () => (
    <div id="resume-preview" className="bg-white p-8 w-[210mm] min-h-[297mm] shadow-2xl text-gray-800">
        <div className="border-b-4 border-blue-600 pb-4 mb-6">
            <h1 className="text-4xl font-black text-gray-900 mb-1 uppercase tracking-tighter">{resume.name}</h1>
            <h2 className="text-xl font-bold text-blue-600 uppercase tracking-widest">{resume.title}</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            {resume.summary && (
              <section className="mb-6">
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-2 border-b-2 border-gray-100 pb-1">Professional Summary</h3>
                  <p className="leading-relaxed text-gray-600 text-[11px]">{resume.summary}</p>
              </section>
            )}

            {resume.experience.length > 0 && (
              <section className="mb-6">
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-2 border-b-2 border-gray-100 pb-1">Experience</h3>
                  <div className="space-y-4">
                      {resume.experience.map((exp, i) => (
                          <div key={exp.id || i} className="experience-item">
                              <div className="flex justify-between items-baseline">
                                  <h4 className="text-sm font-bold text-gray-900">{exp.title}</h4>
                                  <span className="text-[10px] text-gray-400 font-bold uppercase">{exp.duration}</span>
                              </div>
                              <div className="text-[11px] text-blue-600 font-bold mb-1">{exp.company}</div>
                              <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{exp.description}</p>
                          </div>
                      ))}
                  </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="mb-6">
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-2 border-b-2 border-gray-100 pb-1">Projects</h3>
                  <div className="space-y-4">
                      {projects.map((proj, i) => (
                          <div key={proj.id || i} className="project-item">
                              <div className="flex justify-between items-baseline">
                                  <h4 className="text-sm font-bold text-gray-900">{proj.title}</h4>
                                  <span className="text-[10px] text-gray-400 font-bold uppercase">{proj.duration}</span>
                              </div>
                              <p className="text-[10px] text-gray-500 leading-relaxed text-justify">{proj.description}</p>
                          </div>
                      ))}
                  </div>
              </section>
            )}
          </div>

          <div className="col-span-1">
            {resume.skills.length > 0 && (
              <section className="mb-6">
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-2 border-b-2 border-gray-100 pb-1">Skills</h3>
                  <div className="flex flex-wrap gap-1">
                      {resume.skills.map((skill, i) => (
                          skill ? <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider">{skill}</span> : null
                      ))}
                  </div>
              </section>
            )}

            {resume.education.length > 0 && (
              <section className="mb-6">
                  <h3 className="text-lg font-black text-gray-900 uppercase mb-2 border-b-2 border-gray-100 pb-1">Education</h3>
                  <div className="space-y-4">
                      {resume.education.map((edu, i) => (
                          <div key={edu.id || i} className="education-item">
                              <h4 className="text-xs font-bold text-gray-900 mb-0.5">{edu.degree}</h4>
                              <div className="text-[10px] text-gray-500 font-medium">{edu.institution}</div>
                              <div className="text-[9px] text-blue-600 font-bold mt-0.5">{edu.duration}</div>
                          </div>
                      ))}
                  </div>
              </section>
            )}
          </div>
        </div>
    </div>
  );

  const renderClassic = () => (
    <div id="resume-preview" className="bg-white p-8 w-[210mm] min-h-[297mm] shadow-2xl text-black font-serif">
      <div className="text-center mb-6 border-b border-black pb-4">
        <h1 className="text-3xl font-bold mb-1 uppercase">{resume.name}</h1>
        <h2 className="text-lg italic text-gray-700">{resume.title}</h2>
      </div>

      {resume.summary && (
        <section className="mb-6">
          <h3 className="text-md font-bold border-b border-black mb-2 uppercase tracking-widest text-center">Summary</h3>
          <p className="text-[11px] leading-relaxed text-center italic px-6">{resume.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          {resume.experience.length > 0 && (
            <section className="mb-6">
              <h3 className="text-md font-bold border-b border-black mb-3 uppercase tracking-widest">Experience</h3>
              <div className="space-y-4">
                {resume.experience.map((exp, i) => (
                  <div key={exp.id || i} className="experience-item">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-sm">{exp.company}</span>
                      <span className="text-[10px]">{exp.duration}</span>
                    </div>
                    <div className="font-bold text-[11px] italic mb-1">{exp.title}</div>
                    <p className="text-[10px] leading-relaxed text-justify">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section className="mb-6">
              <h3 className="text-md font-bold border-b border-black mb-3 uppercase tracking-widest">Projects</h3>
              <div className="space-y-4">
                {projects.map((proj, i) => (
                  <div key={proj.id || i} className="project-item">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-sm">{proj.title}</span>
                      <span className="text-[10px]">{proj.duration}</span>
                    </div>
                    <p className="text-[10px] leading-relaxed text-justify">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="col-span-1">
          {resume.skills.length > 0 && (
            <section className="mb-6">
              <h3 className="text-md font-bold border-b border-black mb-3 uppercase tracking-widest">Skills</h3>
              <ul className="text-[10px] space-y-0.5 list-disc pl-4">
                {resume.skills.map((skill, i) => skill ? <li key={i}>{skill}</li> : null)}
              </ul>
            </section>
          )}
          {resume.education.length > 0 && (
            <section className="mb-6">
              <h3 className="text-md font-bold border-b border-black mb-3 uppercase tracking-widest">Education</h3>
              {resume.education.map((edu, i) => (
                <div key={edu.id || i} className="mb-3 education-item">
                  <div className="font-bold text-[10px]">{edu.degree}</div>
                  <div className="text-[9px]">{edu.institution}</div>
                  <div className="text-[9px] italic">{edu.duration}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const renderCreative = () => (
    <div id="resume-preview" className="bg-white w-[210mm] min-h-[297mm] shadow-2xl flex overflow-hidden">
      <div className="w-1/3 bg-gray-900 text-white p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl font-black mb-1 leading-none">{(resume.name || '').split(' ')[0]}</h1>
          <h1 className="text-3xl font-light mb-2 leading-none">{(resume.name || '').split(' ')[1]}</h1>
          <div className="h-1 w-10 bg-green-500"></div>
        </div>

        <section className="mb-8">
          <h3 className="text-[11px] font-black uppercase tracking-widest mb-3 text-green-500">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill, i) => (
              skill ? <span key={i} className="border border-gray-700 text-gray-300 px-1.5 py-0.5 text-[8px] font-bold rounded">{skill}</span> : null
            ))}
          </div>
        </section>

        {resume.education.length > 0 && (
          <section className="mb-8">
            <h3 className="text-[11px] font-black uppercase tracking-widest mb-3 text-green-500">Education</h3>
            {resume.education.map((edu, i) => (
              <div key={edu.id || i} className="mb-3 education-item">
                <div className="font-bold text-[10px]">{edu.degree}</div>
                <div className="text-[8px] text-gray-500">{edu.institution}</div>
                <div className="text-[8px] text-green-500 mt-0.5 font-bold">{edu.duration}</div>
              </div>
            ))}
          </section>
        )}
      </div>

      <div className="w-2/3 p-10 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-1">{resume.title}</h2>
        <div className="h-0.5 w-full bg-gray-200 mb-6"></div>

        {resume.summary && (
          <section className="mb-8">
            <p className="text-[11px] text-gray-600 leading-relaxed text-justify italic">{resume.summary}</p>
          </section>
        )}

        {resume.experience.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">01</span>
              Work Experience
            </h3>
            <div className="space-y-6 border-l-2 border-gray-200 pl-5 ml-3">
              {resume.experience.map((exp, i) => (
                <div key={exp.id || i} className="relative experience-item">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white border-3 border-green-500"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[13px] font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-[9px] text-green-600 font-black">{exp.duration}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold mb-2 uppercase tracking-wider">{exp.company}</div>
                  <p className="text-[10px] text-gray-600 leading-relaxed text-justify">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tighter mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">02</span>
              Projects
            </h3>
            <div className="space-y-6 border-l-2 border-gray-200 pl-5 ml-3">
              {projects.map((proj, i) => (
                <div key={proj.id || i} className="relative project-item">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-white border-3 border-green-500"></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[13px] font-bold text-gray-900">{proj.title}</h4>
                    <span className="text-[9px] text-green-600 font-black">{proj.duration}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed text-justify">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  switch (template) {
    case 'harvard': return <Harvard resume={resume} />;
    case 'tech': return <TechFocused resume={resume} />;
    case 'minimalist': return <Minimalist resume={resume} />;
    case 'classic': return renderClassic();
    case 'creative': return renderCreative();
    case 'modern':
    default:
      return renderModern();
  }
}

export default Resume;