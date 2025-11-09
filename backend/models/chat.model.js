import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Chat=mongoose.model("Partners",chatSchema)

export default Chat;