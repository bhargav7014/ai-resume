import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-zinc-950 border-b border-zinc-900 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-zinc-950">A</div>
          <span className="ml-3 text-xl font-black uppercase tracking-tighter italic">AI Resume<span className="text-emerald-500">.</span></span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-sm font-bold uppercase tracking-widest text-zinc-500">
          <Link to="/app/dashboard" className="mr-8 hover:text-white transition-colors">Dashboard</Link>
          <Link to="/" className="mr-8 hover:text-white transition-colors">Templates</Link>
          <Link to="/" className="mr-8 hover:text-white transition-colors">Support</Link>
        </nav>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link to="/app/dashboard" className="bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header