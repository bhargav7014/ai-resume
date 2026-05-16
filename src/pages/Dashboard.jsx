import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../utils/db'

const Dashboard = () => {
  const [resumes, setResumes] = useState([])

  useEffect(() => {
    // Initialize from DB (which is now empty by default)
    setResumes(db.resumes)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setResumes(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-white uppercase italic tracking-tight">Your <span className="text-emerald-500">Workspace</span></h1>
            <p className="text-zinc-500 mt-2 font-medium">Manage your professional profiles.</p>
          </div>
          <Link 
            to="/app/builder/new" 
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all shadow-xl shadow-emerald-900/20 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Resume
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* New Resume Placeholder */}
          <Link 
            to="/app/builder/new"
            className="h-80 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">➕</div>
            <span className="font-black uppercase tracking-widest text-zinc-500 group-hover:text-emerald-500 transition-colors">Start Fresh</span>
          </Link>

          {/* Resume List */}
          {resumes.map(resume => (
            <div key={resume.id} className="h-80 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between hover:border-zinc-700 transition-all relative group overflow-hidden">
               <div className="absolute -bottom-10 -right-10 text-[180px] font-black text-white/5 italic select-none">
                 {resume.id.slice(-1)}
               </div>

               <div className="space-y-2 relative z-10">
                 <div className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                   Live Session
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase italic tracking-tight leading-none">{resume.name || 'Untitled'}</h3>
                 <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{resume.title || 'No Title'}</p>
               </div>

               <div className="flex items-center gap-3 relative z-10">
                 <Link 
                   to={`/app/builder/${resume.id}`}
                   className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black rounded-xl text-center text-xs uppercase tracking-widest transition-all"
                 >
                   Edit
                 </Link>
                 <button 
                   onClick={() => handleDelete(resume.id)}
                   className="p-3 bg-zinc-800 hover:bg-red-500/20 hover:text-red-500 text-zinc-400 rounded-xl transition-all"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                 </button>
               </div>
            </div>
          ))}
        </div>
        
        {resumes.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-zinc-900 border-dashed">
            <p className="text-zinc-500 font-medium italic">No resumes found. Click "New Resume" to start your session.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
