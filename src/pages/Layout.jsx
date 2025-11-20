import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/app/Header'

const Layout = () => {
  return (
    <div>
      <Header />
      <div className='bg-gray-900'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
