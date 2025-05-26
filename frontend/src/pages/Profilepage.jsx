import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Camera } from 'lucide-react';

function Profilepage() {

  const {authUser,isUpdatingProfile,updateProfile}=useAuthStore()
  const [selectedImage, setSelectedImage]=useState(null);

  const handleImageUpdate=(e)=>{
   const file=e.target.files[0];
   if(!file) return;

   const reader=new FileReader();

   reader.readAsDataURL(file);
   reader.onload=async()=>{
    const base64Image=reader.result;
    setSelectedImage(base64Image)
    await updateProfile({profilePic:base64Image})
   }
  }

  return (<div className="pt-20 flex justify-center bg-gray-100 p-4 min-h-screen">
  <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full">
    <h2 className="text-2xl font-semibold mb-1 text-center">My Profile</h2>
    <h3 className="text-sm mb-4 text-zinc-500 text-center">Your Profile Information</h3>

    <div className="flex flex-col space-y-4 items-start">
      {/* Profile Image */}
      <div className="relative self-center">
        <img
          src={
             selectedImage || authUser.profilePic ||
            'https://www.pngfind.com/pngs/m/34-349693_circled-user-icon-transparent-background-username-icon-hd.png'
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
        <label
          htmlFor="imageUpload"
          className={`absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 ${
            isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
          }`}
        >
          <Camera className="w-5 h-5" />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpdate}
            disabled={isUpdatingProfile}
            className="hidden"
          />
        </label>
      </div>

      <p className="text-sm text-zinc-400 self-center">
        {isUpdatingProfile ? 'Uploading...' : 'Click the camera to update your photo'}
      </p>

      {/* Name and Email */}
      <div className="w-full space-y-4 text-left">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Full Name</p>
          <div className="border border-gray-300 rounded-lg p-3">
            <p className="text-base font-medium text-gray-800">{authUser.fullName}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Email Address</p>
          <div className="border border-gray-300 rounded-lg p-3">
            <p className="text-base font-medium text-gray-800">{authUser.email}</p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-base-300 rounded-xl py-6 px-4 w-full">
        <h2 className="text-lg font-medium mb-4">Account Information</h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-700 flex justify-between">
            <span className="font-medium">Joined:</span>{' '}
            {authUser?.createdAt
              ? new Date(authUser.createdAt).toLocaleDateString()
              : 'N/A'}
          </p>
          <div className="border-t border-gray-200" />
          <p className="text-sm text-gray-700 flex items-center justify-between">
            <span className="font-medium">Status:</span>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
              Active
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>



  );
}

export default Profilepage