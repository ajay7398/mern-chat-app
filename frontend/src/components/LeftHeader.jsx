import React, { useContext, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { logoutUser, searchUser } from "../api/userAPI.js";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { createOrGetChat, getUserChats } from "../api/chatAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function LeftHeader() {
  const { setUser,setChats,setSelectedChat} = useContext(UserContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && search.trim() !== "") {
      try {
         searchUser(search.trim()).then(async(result) => {
            if (!result.success) {
      toast.error(result.message || "User not found");
      setSearch("");
      return;
    }
          await createOrGetChat(result.result._id);
          const chatData=await getUserChats()
          setChats(chatData);
          setSearch("");
        });
       
        // You can store result in context or a state
        // Example: setSearchResults(result);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  return (
    <div className="w-full bg-gray-800 ">
      <div className="w-full flex justify-between items-center p-3">
        <h1 className="text-white p-3 font-bold">Chats</h1>
        <IoMdLogOut
          className="text-2xl"
          onClick={() => logoutUser(setUser, navigate,setSelectedChat)}
        />
      </div>

      <div className="w-full flex p-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-white mx-5 flex-1 p-1 border-b-2 rounded border-b-green-600 bg-slate-500 outline-none"
          placeholder="Search or Start new chat"
        />

      </div>
       <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default LeftHeader;
