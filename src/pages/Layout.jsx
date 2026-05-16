import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/app/Header'

const Layout = () => {
  return (
    <div className="bg-zinc-950">
      <Header />
      <main className="bg-zinc-950">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
