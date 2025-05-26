import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { X, Image, Send, SendHorizonal } from 'lucide-react'
import toast from 'react-hot-toast';


function MessageInput() {

  const [text,setText]=useState("");
  const [imagePreview,setImagePreview]=useState(null);
  const fileInputRef=useRef(null);
  const {sendMessages}=useChatStore();


  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if (!file.type.startsWith("image/")){
      toast.error("Please select an image file")
      return
    }

    const reader=new FileReader();
    reader.onloadend=()=>{
      setImagePreview(reader.result)
    };
    reader.readAsDataURL(file)

  };

  const removeImage=(e)=>{
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value="";
  }

  const handleSendMessage=async(e)=>{
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessages({
        text:text.trim(),
        image:imagePreview,
      })

      setText("")
      setImagePreview(null)
      if(fileInputRef.current) fileInputRef.current.value=""
      
    } catch (error) {
      console.error("Failed to send message:",error)
    }

  };

  return (
   <div className="p-4 w-full">
  {imagePreview && (
    <div className="mb-3 relative flex items-center gap-2">
      <img
        src={imagePreview}
        alt="Preview"
        className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
      />
      <button
        onClick={removeImage}
        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center"
        type="button"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  )}
  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
    <div className="flex-1 flex gap-2">
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          imagePreview ? "text-emerald-500" : "text-zinc-400"
        } hover:bg-gray-100 dark:hover:bg-zinc-800`}
      >
        <Image size={20} />
      </button>
      
    </div>
    <button
      type='submit'
     className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-400  hover:bg-zinc-800 transition-colors"
     disabled={!text.trim() && !imagePreview}
      >
        <Send size={22}/>
      </button>
  </form>
</div>


  )
}

export default MessageInput