import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { createOrGetChat, getUserChats } from "../api/chatAPI";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { searchUser } from "../api/userAPI";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
function NewChat({ showNewChat, setShowNewChat }) {
  const [search, setSearch] = useState("");
const {setChats}=useContext(UserContext);
  const handleSearch = async () => {
    if (search.trim() !== "") {
      try {
        const result = await searchUser(search.trim());

        if (!result.success) {
          toast.error(result.message || "User not found");
          setSearch("");
          return;
        }

        await createOrGetChat(result.result._id);
        const chatData = await getUserChats();
        setChats(chatData);
        setSearch("");
      } catch (error) {
        console.error("Error searching users:", error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div
      className={`w-[35%] h-screen p-5 flex flex-col gap-5 bg-slate-700 duration-1000 ease-linear absolute ${
        showNewChat ? "left-0" : "left-[-100%]"
      } top-0 z-500`}
    >
      <GoArrowLeft
        className="text-white text-2xl"
        onClick={() => setShowNewChat(false)}
      />
      <div className="ring rounded-full flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user"
          className="w-full outline-none p-2"
        />
        <button onClick={handleSearch} className=" bg-green-600 rounded-full px-5 ">Add</button>
      </div>
       <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default NewChat;
