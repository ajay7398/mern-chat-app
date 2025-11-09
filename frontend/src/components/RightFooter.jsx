import React, { useContext } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import { UserContext } from "../context/UserContext";
import { sendMessage } from "../api/messageAPI.js";
import { socket } from "../context/UserContext.jsx";
function RightFooter() {
  const { selectedChat,user,messages } = useContext(UserContext);
  
  const [message, setMessage] = React.useState("");
  const onSendMessage = (id,message) => {

    sendMessage(id, message)
      .then((res) => {
        console.log("Message sent:", res);
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });
    socket.emit("sendMessage", { chatId: id, message: { text: message,senderId:{_id:user._id} } });
    setMessage("");
  };
  return (
    <div className="max-w-screen flex items-center justify-between bg-gray-800 p-3 absolute bottom-0 left-0 right-0 w-full">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="text-white outline-0 w-[90%"
        type="text"
        placeholder="type a message"
      />
      <div onClick={()=>onSendMessage(selectedChat?._id,message)} className="py-1 px-2 bg-gray-700 rounded">
        <LuSendHorizontal />
      </div>
    </div>
  );
}

export default RightFooter;
