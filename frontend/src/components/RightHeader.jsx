import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function RightHeader() {
  const {selectedChat,user}=useContext(UserContext);
 const selectedUser=selectedChat?.members.find((chat)=>chat._id!=user._id);
 
  return (
    <div className='w-full bg-gray-800 flex items-center justify-start'>
  
      <img  src={selectedUser?.profilePic} className={`w-8 h-8 rounded-full m-2 ${selectedChat?.members[0].profilePic?"lock":"hidden"}`}/>
       <h1 className='text-white p-3 font-bold'>{selectedUser?.name}</h1>
    </div>
  )
}

export default RightHeader

