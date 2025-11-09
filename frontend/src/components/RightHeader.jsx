import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function RightHeader() {
  const {selectedChat,user}=useContext(UserContext);
 const selectedUser=selectedChat?.members.find((chat)=>chat._id!=user._id);
 
  return (
    <div className='w-full bg-gray-800 flex items-center justify-end'>
        <h1 className='text-white p-3 font-bold'>{selectedUser?.name}</h1>
      <img  src={selectedUser?.profilePic} className={`w-5 h-5 rounded-full m-2 ${selectedChat?.members[0].profilePic?"lock":"hidden"}`}/>
    </div>
  )
}

export default RightHeader

