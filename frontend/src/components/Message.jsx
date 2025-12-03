import React, { use, useContext, useRef } from "react";
import { getUserMessages } from "../api/messageAPI.js";
import { UserContext } from "../context/UserContext.jsx";
import { useEffect } from "react";
import { socket } from "../context/UserContext.jsx";
function Message() {
  const { selectedChat, setMessages, user, messages } = useContext(UserContext);
  const messageEndRef = useRef(null);
  useEffect(()=>{
 getUserMessages(selectedChat?._id)
      .then((res) => {
        setMessages(res);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
      });
  },[selectedChat])
  useEffect(() => {
     socket.on("message-saved", ({ chatId }) => {
    if (chatId === selectedChat?._id) {
      getUserMessages(chatId)
      .then((res) => {
        setMessages(res);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
      });
    }
  });
   return () => {
    socket.off("message-saved");
  };
    // getUserMessages(selectedChat?._id)
    //   .then((res) => {
    //     setMessages(res);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching messages:", err);
    //   });
  }, [selectedChat]);

  useEffect(() => {
    socket.emit("joinChat", selectedChat._id);
    socket.on("receiveMessage", (message) => {
      // Add new message to the current chat in state
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  });

  // ✅ 3️⃣ Scroll to bottom whenever messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="overflow-y-auto overflow-x-hidden h-full w-full text-slate-200 px-3 pb-25">
      {!messages || messages.length === 0 ? (
        <h1 className="flex justify-center items-center h-full text-white font-bold text-3xl">
          let's start chatting
        </h1>
      ) : (
        messages.map((msg, index) => {
          return (
            <div
              className={`w-full flex  ${
                msg?.senderId._id == user._id ? "justify-end" : "justify-start"
              } m-1`}
            >
              <div
                className={`${
                  msg?.senderId._id == user._id
                    ? "bg-green-900"
                    : "bg-slate-900"
                } rounded ring px-2 py-0.5 flex gap-7 items-center`}
              >
                <h1 className="text-gray-200">{msg.text}</h1>
                <p className="text-gray-400 text-[10px]">
                  {new Date(msg.createdAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })
      )}
        <div ref={messageEndRef}></div>
    </div>
  );
}

export default Message;
