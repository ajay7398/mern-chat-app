import { Router } from "express";
import { allUser, login, Logout, searchUser, signup, updateProfile } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/authUser.js";
import upload from "../config/multer.js";
const router = Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/me", verifyUser, (req, res) => {
  res.json({ user: req.user });
});

router.post("/logout",Logout);
router.post("/",searchUser);
router.put("/upload",verifyUser,upload.single("image"),updateProfile);
export default router;