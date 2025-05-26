import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore.js'

function ChatCountainer() {

  const {messages,getMessage,isMessagesLoading,selectedUser,subscribeTomessages,unsubscribeFromMessages}=useChatStore()
  const {authUser}=useAuthStore()
  const messageEndRef= useRef(null);


  
  
  useEffect(() => {
    getMessage(selectedUser._id)

    subscribeTomessages();

   return ()=>unsubscribeFromMessages();
  }, [selectedUser._id,getMessage,unsubscribeFromMessages, subscribeTomessages])

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }
      
  }, [messages])
  
  
  if(isMessagesLoading) return (<div className='flex-1 flex flex-col overflow-auto'>
    <ChatHeader/>
    <MessageSkeleton/>
    <MessageInput/>
  </div>)

return (
  <div className="flex-1 flex flex-col overflow-auto">
    <ChatHeader />

    <div className="flex-1 overflow-auto p-4 space-y-4">
      {messages.map((msg) => {
        const isOwnMessage = msg.senderId === authUser._id;
        const avatarSrc = isOwnMessage
          ? authUser.profilePic || "/avatar.png"
          : selectedUser.profilePic || "/avatar.png";

        return (
          <div
            key={msg._id}
            className={`flex flex-col ${isOwnMessage ? "items-end" : "items-start"}`}
            ref={messageEndRef}
          >
            <div className={`flex items-end gap-2 max-w-[80%] ${isOwnMessage ? "flex-row-reverse" : ""}`}>
              {/* Avatar */}
              <img
                src={avatarSrc}
                alt="Profile Pic"
                className="w-10 h-10 rounded-full border"
              />

              {/* Message Bubble */}
              <div
                className={`p-1.5 rounded-lg ${
                  isOwnMessage
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="max-w-[200px] rounded-md mb-2"
                  />
                )}
                {msg.text && <p>{msg.text}</p>}
              </div>
            </div>

            {/* Timestamp BELOW the message bubble */}
            <time className="text-[10px] text-gray-400 mt-1 px-12">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
        );
      })}
    </div>

    <MessageInput />
  </div>
);




}

export default ChatCountainer