import React from 'react'

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2024 Resume Builder —
          <a href="https://github.com/Bhargav-J-K" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@Bhargav-J-K</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
