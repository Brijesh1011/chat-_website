import React, { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import SignUppage from './pages/SignUppage'
import Loginpage from './pages/Loginpage'
import Settingpage from './pages/Settingpage'
import Profilepage from './pages/Profilepage'
import { useAuthStore } from './store/useAuthStore.js'
import {Toaster} from "react-hot-toast"

import {Loader} from 'lucide-react'

function App() {

  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log(onlineUsers)
  
  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/'element={authUser ?<Homepage/>:<Navigate to="/login"/>} />
      <Route path='/signup'element={!authUser? <SignUppage/> :<Navigate to="/"/>} />
      <Route path='/login'element={!authUser? <Loginpage/> :<Navigate to="/"/>} />
      <Route path='/settings'element={<Settingpage/>} />
      <Route path='/profile'element={authUser ?<Profilepage/>:<Navigate to="/login"/>} />
    </Routes>
    <Toaster />
    </BrowserRouter>
  )
}

export default App
