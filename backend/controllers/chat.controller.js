import Chat from "../models/chat.model.js";
// POST /api/chats

export const createOrGetChat = async (req, res) => {
  try {
    const { userId } = req.body; // ID of the user you want to chat with
    const loggedInUserId = req.user._id; // coming from middleware (after verifying JWT)
if(!loggedInUserId){
        return res.status(401).json({ message: "Not authorized" });
}
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    // 1️⃣ Check if chat already exists
    let chat = await Chat.findOne({
      members: { $all: [loggedInUserId, userId] },
    }).populate("members", "-password"); // populate to get user details

    // 2️⃣ If chat exists, return it
    if (chat) {
      return res.status(200).json(chat);
    }

    // 3️⃣ Otherwise, create a new chat
    const newChat = await Chat.create({
      members: [loggedInUserId, userId],
    });

    // populate members before sending
    const fullChat = await newChat.populate("members", "-password");

    return res.status(201).json(fullChat);
  } catch (error) {
    console.error("Error in createOrGetChat:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUserChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const chats = await Chat.find({
      members: { $in: [loggedInUserId] },
    }).populate("members", "-password");
    return res.status(200).json(chats);
  } catch (error) {
    console.error("Error in getUserChats:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};