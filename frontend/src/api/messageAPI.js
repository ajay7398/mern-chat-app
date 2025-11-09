import api from "./baseAPI";


export const sendMessage = async (chatId, text) => {
  try {
const result=await api.post(`/api/message/${chatId}`, { text });
return result.data;
  } catch (error) {
    console.error("Send Message failed:", error.response?.data || error.message);
    throw error;
  }
};


export const getUserMessages = async (chatId) => {
  try {
    const response = await api.get(`/api/message/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Get User Messages failed:", error.response?.data || error.message);
    throw error;
  }
};