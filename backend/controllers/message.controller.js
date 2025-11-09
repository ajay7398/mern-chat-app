import Message from "../models/message.model.js";
import Chat from "../models/chat.model.js";

// ✅ Send a new message
export const sendMessage = async (req, res) => {
  try {
    const {text } = req.body;
    const { chatId } = req.params;

    if (!chatId || !text) {
      return res.status(400).json({ message: "chatId and text are required" });
    }

    // Create message
    const newMessage = await Message.create({
      senderId: req.user._id,
      chatId,
      text,
    });

    // Update last message in chat
    await Chat.findByIdAndUpdate(chatId, { lastMessage: text, updatedAt: Date.now() });

    // Populate sender details for frontend
    const populatedMessage = await newMessage.populate("senderId", "name email");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).populate("senderId", "name email");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getUserMessages:", error);
    res.status(500).json({ message: "Server error" });
  }
};
