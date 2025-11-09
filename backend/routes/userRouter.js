import { Router } from "express";
import { allUser, login, Logout, searchUser, signup } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/authUser.js";
const router = Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/me", verifyUser, (req, res) => {
  res.json({ user: req.user });
});

router.post("/logout",Logout);
router.post("/",searchUser);

export default router;