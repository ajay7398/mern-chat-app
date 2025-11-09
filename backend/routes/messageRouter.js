import { Router } from "express";
import { getUserMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyUser } from "../middleware/authUser.js";
const router=Router();

router.post("/:chatId",verifyUser,sendMessage);
router.get("/:chatId",verifyUser,getUserMessages);
export default router;