import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-zinc-950">A</div>
          <span className="text-xl font-black uppercase tracking-tighter italic">AI Resume<span className="text-emerald-500">.</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-500">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          <Link to="/app/dashboard" className="text-emerald-500 hover:text-emerald-400 transition-colors">Go to App</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            Powered by Groq AI & Llama 3.3
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight uppercase italic">
            Build a Resume that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              Guarantees Job Offers.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
            Stop sending resumes into the void. Use our strategic AI to match job descriptions, 
            optimize for ATS, and generate high-impact achievements in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link 
              to="/app/dashboard" 
              className="px-12 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-emerald-900/30 text-lg group"
            >
              Start Building Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
            <button className="px-12 py-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-black rounded-2xl transition-all text-lg">
              View Templates
            </button>
          </div>

          {/* Social Proof / Tech Stack */}
          <div className="pt-24 space-y-8 opacity-50">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Optimized for Global ATS Standards</p>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale">
              {/* Fake logo placeholders for visual impact */}
              <div className="text-2xl font-black italic">Workday</div>
              <div className="text-2xl font-black italic">Taleo</div>
              <div className="text-2xl font-black italic">Greenhouse</div>
              <div className="text-2xl font-black italic">Lever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-tight italic">ATS Scoring</h3>
            <p className="text-zinc-500 leading-relaxed font-medium">Real-time analysis of your resume against modern ATS filters with 100% accurate job fit scores.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🪄</div>
            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-tight italic">Magic Import</h3>
            <p className="text-zinc-500 leading-relaxed font-medium">Upload any PDF or Word file and watch our AI instantly map it to a structured, professional layout.</p>
          </div>
          <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">✨</div>
            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-tight italic">AI Polish</h3>
            <p className="text-zinc-500 leading-relaxed font-medium">Generate high-impact, quantitative bullet points that recruiters love using industry-leading LLMs.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
