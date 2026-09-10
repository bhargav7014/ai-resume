import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, FileText, Sparkles, Target, Wand2 } from 'lucide-react'

const features = [
  { icon: Target, title: 'ATS analysis', text: 'Compare your resume with a target job description and get a practical fit score plus specific gaps to fix.' },
  { icon: Wand2, title: 'AI rewriting', text: 'Turn vague bullets into concise, achievement-focused resume language without losing the original meaning.' },
  { icon: FileText, title: 'Import & export', text: 'Import existing resume text, edit it in a live builder, then export a clean document for applications.' },
]

const Home = () => (
  <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30">
    <nav className="sticky top-0 z-50 border-b border-zinc-900/80 bg-zinc-950/85 px-6 py-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 font-black text-zinc-950">A</span>
          <span className="text-lg font-black tracking-tight">AI Resume<span className="text-emerald-500">.</span></span>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-semibold text-zinc-400 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#how-it-works" className="transition hover:text-white">How it works</a>
          <Link to="/app/dashboard" className="text-emerald-400 transition hover:text-emerald-300">Open builder</Link>
        </div>
      </div>
    </nav>

    <section className="relative overflow-hidden px-6 pb-24 pt-28 md:pt-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs font-bold text-emerald-400">
          <Sparkles size={14} /> AI-assisted resume building
        </div>
        <h1 className="text-5xl font-black tracking-[-0.04em] md:text-7xl lg:text-8xl">
          Build a stronger resume.
          <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Apply with confidence.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
          Import your existing resume, tailor it to a job description, improve your wording with AI, and export a polished version — all in one workspace.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/app/builder/new" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 font-bold text-zinc-950 transition hover:bg-emerald-400">
            Build my resume <ArrowRight size={18} />
          </Link>
          <a href="#features" className="rounded-2xl border border-zinc-800 bg-zinc-900 px-7 py-4 font-bold transition hover:border-zinc-700 hover:bg-zinc-800">Explore features</a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-zinc-500">
          {['React + Vite', 'Groq AI', 'ATS-focused', 'PDF / Word export'].map(item => (
            <span key={item} className="inline-flex items-center gap-2"><Check size={15} className="text-emerald-500" />{item}</span>
          ))}
        </div>
      </div>
    </section>

    <section id="features" className="border-y border-zinc-900 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500">Built for practical applications</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">Everything you need to improve the resume you already have.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-emerald-500/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400"><Icon size={23} /></div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-500">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500">Simple workflow</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">From rough draft to application-ready.</h2>
          <div className="mt-8 space-y-5">
            {['Import or start from scratch', 'Paste the target job description', 'Use AI to analyze and improve weak sections', 'Preview your resume and export it'].map((step, i) => (
              <div key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 text-sm font-bold text-emerald-400">{i + 1}</span>
                <p className="pt-1 text-zinc-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-8 shadow-2xl shadow-black/20">
          <div className="mb-5 flex items-center justify-between border-b border-zinc-800 pb-5">
            <span className="font-bold">Resume analysis</span><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">AI powered</span>
          </div>
          <div className="space-y-5">
            <div><div className="mb-2 flex justify-between text-sm"><span className="text-zinc-400">Job fit</span><span className="font-bold text-emerald-400">86/100</span></div><div className="h-2 rounded-full bg-zinc-800"><div className="h-2 w-[86%] rounded-full bg-emerald-500" /></div></div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm leading-6 text-zinc-400">Example feedback: strengthen the project bullets with measurable outcomes and mirror the most relevant keywords from the job description.</div>
          </div>
        </div>
      </div>
    </section>

    <footer className="border-t border-zinc-900 px-6 py-8 text-center text-sm text-zinc-600">AI Resume · AI-assisted editing, not a guarantee of employment.</footer>
  </main>
)

export default Home
