import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partners",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String, // for image messages
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
  },
  { timestamps: true }
);

const Message= mongoose.model("Message", messageSchema);
export default Message;
