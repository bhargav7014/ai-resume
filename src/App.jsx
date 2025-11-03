import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import Layout from './pages/layout'
import Resumebuilder from './pages/resumebuilder'
import Preview from './pages/preview'
import  LogIn  from './pages/login'

const App = () => {
  return (
    <>
      <Routes>
        {/* Define your routes here */}
        <Route path='/' element={<Home/>} />

        <Route path='app' element={<Layout/>} >
          <Route index element={<Dashboard/>} />
          <Route path='builder/:resumeId' element={<Resumebuilder/>} />
        </Route>

        <Route path='view/:resumeId' element={<Preview/>} />
        <Route path='login' element={<LogIn/>} />
      </Routes>
    </>
  )
}

export default App
