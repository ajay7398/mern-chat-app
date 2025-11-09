import React, { useEffect, useState } from 'react';
import api from '../api/baseAPI.js';
import { getUserChats } from '../api/chatAPI.js';
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL);
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const verifyAndFetch = async () => {
      try {
        const res = await api.get("/api/user/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
     

        // ✅ Now fetch chats only when verified user exists
        const chatData = await getUserChats();
        setChats(chatData);
      } catch (err) {
        setUser(null);
        setChats([]); // clear chats on logout or invalid token
      } finally {
        setLoading(false);
      }
    };

    verifyAndFetch();
  }, []); // run once on mount

  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setSelectedChat,
        selectedChat,
        chats,
        setChats,
        messages,
        setMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
