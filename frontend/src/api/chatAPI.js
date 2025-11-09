import api from "./baseAPI";

export const createOrGetChat = async (userId) => {
  try {
    const response = await api.post("/api/chat/", { userId });
    return response.data;
  } catch (error) {
    console.error("Create or Get Chat failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getUserChats = async () => {
  try {
    const response = await api.get("/api/chat/");
    console.log("Fetched user chats:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get User Chats failed:", error.response?.data || error.message);
    throw error;
  }
};