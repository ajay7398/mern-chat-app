import React, { useContext } from "react";
import RightHeader from "../components/rightHeader";
import RightFooter from "../components/RightFooter";
import LeftHeader from "../components/LeftHeader";
import Chats from "../components/Chats";
import Message from "../components/Message";
import { UserContext } from "../context/UserContext";

function HomePage() {
  const { selectedChat } = useContext(UserContext);

  return (
    <div className="h-screen w-full flex text-white overflow-hidden">
      {/* ---------- LEFT PANEL ---------- */}
      <div
        className={`h-full overflow-hidden bg-gray-800 border-r border-black flex flex-col md:w-1/3 w-full ${
          selectedChat ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header fixed at top */}
        <div className="flex-shrink-0">
          <LeftHeader />
        </div>

        {/* Chats scrollable */}
        <div>
          <Chats />
        </div>
      </div>

      {/* ---------- RIGHT PANEL ---------- */}
      <div
        className={`h-full relative overflow-hidden bg-slate-600 flex flex-col md:w-2/3 w-full ${
          selectedChat ? "flex" : "hidden md:flex"
        }`}
      >
        {/* Header fixed at top */}
        <div className="flex-shrink-0">
          <RightHeader />
        </div>

        {/* Scrollable message area */}
        <div className="flex-grow overflow-y-auto">
          {selectedChat ? (
            <Message />
          ) : (
            <div className="h-full flex justify-center items-center">
              <h1 className="text-3xl font-bold">
                Select a chat to start messaging
              </h1>
            </div>
          )}
        </div>

        {/* Footer fixed at bottom */}
        <div >
          <RightFooter />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
