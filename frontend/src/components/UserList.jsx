import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { createOrGetChat } from "../api/chatAPI";

function UserList() {
  const { chats,user, setSelectedChat,onlineUsers } = useContext(UserContext);
  const [match, setMatch] = useState(null);
console.log("Online Users in UserList:", onlineUsers);
  const onSelect = async (otherUserId) => {
    try {
      // Create or get existing chat from backend
      const chat = await createOrGetChat(otherUserId);
     
      if (chat) {
        setSelectedChat(chat);   // Update current chat in context
        setMatch(otherUserId);      // Highlight selected chat
      }
    } catch (error) {
      console.error("Error in selecting chat:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
   {
    !user._id ? <p className="flex justify-center items-center">Loading...</p> :
      chats?.map((chat, index) => {
        // find the other user (not current logged-in user)
        const other = chat.members.find((m) => m._id !== user?._id);
       
        if (!other) return null;

        return (
          <div
            key={other._id || index}
            onClick={() => onSelect(other._id)}
            className={`flex items-center relative cursor-pointer min-w-full p-3 ${match === other._id?"ring ring-green-300":"bg-slate-700"}`}
          >
            <img className="w-5 h-5 rounded-full mr-2" src={other.profilePic}/>
           <p>{other.email}</p>
           <h3  className={`w-2 h-2 absolute right-5 bg-green-500 rounded-full ${onlineUsers.includes(other._id)?'block':'hidden'}`}></h3>
          </div>
        );
      })
    }
    </div>
  );
}

export default UserList;
