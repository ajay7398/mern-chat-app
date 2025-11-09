import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, // e.g., "/uploads/profile.jpg"
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User=mongoose.model("User",userSchema);

export default User;