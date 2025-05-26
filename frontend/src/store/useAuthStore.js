import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import {io} from "socket.io-client" 


// const BASE_URL="http://loocalhost:5001"

export const useAuthStore=create((set,get)=>({
 authUser:null,
isSigningup:false,
isLoggingIn:false,
isUpdatingProfile:false,

 isCheckingAuth: true,
 socket:null,
 onlineUsers:[],

 checkAuth: async()=>{
    try {
        const res=await axiosInstance.get("/auth/check")
       set({authUser:res.data})
       get().connectSocket()

    } catch (error) {
        console.log("Error in checkAuth")
        set({authUser:null})
    } finally{
        set({isCheckingAuth:false})
    }
 },

 signup: async(data)=>{
    set({isSigningup:true});
    try {
       const res= await axiosInstance.post("/auth/signup",data);
       set({authUser:res.data});
       toast.success("Account created successfully");
      get().connectSocket()
       
    } catch (error) {
       toast.error(error.response.data.message) 
    } finally{
        set({isSigningup:false})
    }
 },

logout: async () => {
  try {
    await axiosInstance.get("/auth/logout");
    set({ authUser: null });
    toast.success("Logged out successfully");
    get().disconnectSocket()
  } catch (error) {
    const message =
      error?.response?.data?.message || "Something went wrong during logout.";
    toast.error(message);
  }
},

 login: async (data)=>{
 set({isLoggingIn:true})
 try {
  
  const res=await axiosInstance.post("/auth/login",data)
  set({authUser:res.data})
  toast.success("Loged In successfully");
  get().connectSocket()

 } catch (error) {
  toast.error(error.response.data.message) 
 } finally{
        set({isLoggingIn:false})
    }

},


updateProfile: async (data) => {
  set({ isUpdatingProfile: true });

  try {
    const res = await axiosInstance.put("/auth/update-profile", data);
    set({ authUser: res.data.user });
    toast.success("Update successfully");
    return res.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  } finally {
    set({ isUpdatingProfile: false });
  }
},


connectSocket:async()=>{
  const {authUser}=get()
  if(!authUser || get().socket?.connected) return;

  const socket=io(import.meta.env.VITE_BASE_URL,{
    query:{
      userId:authUser._id,
    },
  })
  // console.log(import.meta.env.VITE_BASE_URL)


  socket.connect()

  set({socket:socket})

  socket.on("getOnlineUsers",(userIds)=>{
    set({onlineUsers:userIds })
  })
},

disconnectSocket:async()=>{
  if(get().socket?.connected) get().socket.disconnect();
},



}))
