import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import BuilderPage from './pages/BuilderPage'
import Layout from './pages/Layout'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="builder/:id" element={<BuilderPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
