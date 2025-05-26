import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import AuthImagePatten from '../components/AuthImagePatten';
import { Mail, MessageSquare, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

import { Link } from 'react-router-dom';

function Loginpage() {

  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })
  const {login,isLoggingIn}=useAuthStore();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    login(formData)
  }

  return (
     <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
<p className="text-gray-600">Login to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
           

            {/* --------------- */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="border border-gray-300 rounded-md w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>


            {/* -------------- */}
            {/* --------------- */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="border border-gray-300 rounded-md w-full pl-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="*****"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>


            {/* -------------- */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>

          </form>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

  {/* right side */}

  <AuthImagePatten
  title="join our community"
  subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
  />

    </div>
  )
}

export default Loginpage