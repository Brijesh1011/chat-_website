import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'
import { LogOut, Settings, User, MessageCircle } from 'lucide-react';


function Navbar() {
     const {logout,authUser}=useAuthStore()
  return (
    // <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
    //   <div className='container mx-auto px-4 h-16'>

    //   </div>
    // </header>
         <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-lg border-b border-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Left: Logo + Chatty Name */}
        <Link to="/" className="flex items-center space-x-2 text-gray-800">
          <MessageCircle className="w-6 h-6" />
          <span className="text-2xl font-bold hidden sm:inline">Chatty</span>
        </Link>

        {/* Right: Icon Buttons with Text */}
        <div className="flex items-center space-x-4 text-gray-600">
          <Link 
          to={"/settings"}
          className="flex items-center space-x-1 hover:text-gray-800">
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Settings</span>
          </Link>

            { authUser && (
             <>
              <Link to={"/profile"} className="flex items-center space-x-1 hover:text-gray-800" >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Profile</span>
          </Link>
          <button 
          className="flex items-center space-x-1 hover:text-red-600"
          onClick={logout}
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Logout</span>
          </button>
             </>
            )}
         
        </div>

      </div>
    </nav>
  )
}

export default Navbar