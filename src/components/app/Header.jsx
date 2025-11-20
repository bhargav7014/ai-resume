import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'

const Header = () => {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img src={logo} alt='logo' />
            <span className="ml-3 text-xl">AI Resume</span>
            </a>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to='/app' className="mr-5 hover:text-white">Dashboard</Link>
            <Link to='/app/builder/123' className="mr-5 hover:text-white">Builder</Link>
            <Link to='/' className="mr-5 hover:text-white">Home</Link>
            </nav>
            <Link to='/login' >
            <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Login
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            </button>
            </Link>
        </div>
    </header>
  )
}

export default Header