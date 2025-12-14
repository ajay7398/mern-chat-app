import express from 'express';
import cookieParser from "cookie-parser";
import http from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import cors from 'cors';
import connectDB from './config/DB.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/userRouter.js';
import chatRouter from './routes/chatRouter.js';
import messageRouter from './routes/messageRouter.js';
import Message from './models/message.model.js';
import Chat from './models/chat.model.js';
// Middleware
app.use(cors({
  origin:process.env.CLIENT_URL,  // your React frontend port
  credentials: true,                // allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
connectDB();


// Routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

const server=http.createServer(app);

const io=new Server(server,{
  cors:{
    origin:process.env.CLIENT_URL,
    methods:["GET","POST"],
    credentials:true,
  }
});

const onlineUsers = new Map(); 

// ✅ Handle connection
io.on("connection", (socket) => {
 
 // When user goes online
  socket.on("userOnline", (userId) => {
    onlineUsers.set(userId, socket.id);
    // Send updated list to all users
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });

  socket.on("userOffline", (userId) => {
  onlineUsers.delete(userId);
  io.emit("onlineUsers", Array.from(onlineUsers.keys()));
});

  // Example: user joins a chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  // Example: message sent
  socket.on("sendMessage", async(messageData) => {
    const { chatId, message } = messageData;

  // 1️⃣ Call ML API
  const response = await axios.post("https://ajay-dev-pro-sentiment-model.hf.space/predict", {
    text: message.text
  });
  const sentiment = response.data.label;


       await Message.create({
          senderId: message.senderId._id,
          chatId,
          text: message.text,
          sentiment
        });
        await Chat.findByIdAndUpdate(chatId, { lastMessage: message.text, updatedAt: Date.now() });
    io.to(chatId).emit("message-saved", { chatId });
    // io.to(chatId).emit("receiveMessage", newMessage.text);
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }};
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});


server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});