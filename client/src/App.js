import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Error, UserLogin, UserSignup, AdminLogin, AdminSignup, UserDashboard } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin-signup' element={<AdminSignup />} />
        <Route path='/user-dashboard' element={<UserDashboard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App