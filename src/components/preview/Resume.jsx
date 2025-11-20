import React from 'react'
import { db } from '../../utils/db';

const Resume = () => {
  const resume = db.resumes[0];

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">{resume.name}</h1>
            <h2 className="text-xl font-medium title-font mb-4 text-white">{resume.title}</h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">{resume.summary}</p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 lg:w-1/2 w-full">
                <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                    <h2 className='text-2xl text-white font-bold mb-4'>Skills</h2>
                    <div className='flex flex-wrap gap-2'>
                      {resume.skills.map(skill => <div key={skill} className='bg-green-500 text-white px-2 py-1 rounded'>{skill}</div>)}
                    </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/2 w-full">
                <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                    <h2 className='text-2xl text-white font-bold mb-4'>Experience</h2>
                    <div>
                        {resume.experience.map(exp => (
                            <div key={exp.id} className='mb-4'>
                                <h3 className='text-xl text-white'>{exp.title}</h3>
                                <p className='text-gray-400'>{exp.company} | {exp.duration}</p>
                                <p>{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
              <div className="p-4 w-full">
                <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                    <h2 className='text-2xl text-white font-bold mb-4'>Education</h2>
                    <div>
                        {resume.education.map(edu => (
                            <div key={edu.id} className='mb-4'>
                                <h3 className='text-xl text-white'>{edu.degree}</h3>
                                <p className='text-gray-400'>{edu.institution} | {edu.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
        </div>
    </section>
  )
}

export default Resume