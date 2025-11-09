import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { createOrGetChat, getUserChats } from "../controllers/chat.controller.js";
import { verifyUser } from "../middleware/authUser.js";

const router = Router();

router.post("/chat", sendMessage);
router.post("/",verifyUser,createOrGetChat);
router.get("/",verifyUser,getUserChats);
export default router;