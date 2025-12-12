import React, { use, useContext, useState } from "react";
import { logoutUser, searchUser } from "../api/userAPI.js";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Popover, Space } from "antd";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { socket } from "../context/UserContext.jsx";
import { MdOutlineAddComment } from "react-icons/md";
import NewChat from "./NewChat.jsx";
import { useEffect } from "react";

function LeftHeader() {
  const { setUser, setChats, setSelectedChat, user,chats, setFilteredChats } = useContext(UserContext);
  const navigate = useNavigate();
  const [showNewChat, setShowNewChat] = useState(false);


const [search, setSearch] = useState("");
  const content = (
    <div className="flex flex-col gap-1 text-white">
      <div
        onClick={() => navigate("/profile")}
        className="cursor-pointer bg-gray-400 px-2 py-1 rounded flex justify-start items-center"
      >
        <CgProfile className="text-black" />
        <p className="cursor-pointer bg-gray-400 px-2 py-1 rounded">Profile</p>
      </div>

      <div className="cursor-pointer bg-gray-400 px-2 py-1 rounded flex justify-center items-center gap-1">
        <MdOutlineLogout className="text-black" />
        <p
          onClick={() =>
            logoutUser(user?._id, setUser, navigate, setSelectedChat, socket)
          }
        >
          Logout
        </p>
      </div>
    </div>
  );

   const searchUsers = (text) => {
  setSearch(text);

  if (!text.trim()) {
    setFilteredChats(chats);  // return all chats
    return;
  }

  const results = chats.filter((chat) => {
    const other = chat.members.find((m) => m._id !== user?._id);
    return other?.email.toLowerCase().includes(text.toLowerCase());
  });

  setFilteredChats(results);
};

  
useEffect(() => {
  searchUsers(search);
}, [search, chats]);

   
  return (
    <div className="w-full bg-gray-800">
      <NewChat showNewChat={showNewChat} setShowNewChat={setShowNewChat}/>
      <div className="w-full flex justify-between items-center p-3">
        <h1 className="text-white font-bold">Chats</h1>
        <div className="flex gap-2 items-center">
          <MdOutlineAddComment className="w-7 h-7" onClick={()=>setShowNewChat(!showNewChat)} />
          <Space wrap>
            <Popover content={content} trigger="click">
              <Button>
                <SlOptionsVertical />
              </Button>
            </Popover>
          </Space>
        </div>
      </div>

      <div className="w-full flex p-1">
        <input
          type="text"
          value={search}
          onChange={(e) =>setSearch(e.target.value)}
         
          className="text-white mx-5 flex-1 p-1 border-b-2 border-b-green-600 bg-slate-500 outline-none rounded"
          placeholder="Search chat"
        />
      </div>

     
    </div>
  );
}

export default LeftHeader;
