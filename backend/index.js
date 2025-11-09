import express from 'express';
import cookieParser from "cookie-parser";
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from './config/DB.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/userRouter.js';
import chatRouter from './routes/chatRouter.js';
import messageRouter from './routes/messageRouter.js';
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

// ✅ Handle connection
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // Example: user joins a chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  // Example: message sent
  socket.on("sendMessage", (messageData) => {
    const { chatId, message } = messageData;
    io.to(chatId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});


server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});