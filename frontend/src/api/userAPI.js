
import axios from "axios";
import api from "./baseAPI.js";


export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/api/user/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

export const signupUser = async (username, email, password) => {
  try {
    const response = await api.post("/api/user/signup", { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error;
  }
};

export const logoutUser = async (id,setUser,navigate,setSelectedChat,socket) => {
  try {
    await api.post("/api/user/logout");
  socket.emit("userOffline",id);
    setUser(null);
navigate('/login');
setSelectedChat(null);

  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
}; 

export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/api/user/");
    return response.data.users;
  } catch (error) {
    console.error("Fetching users failed:", error.response?.data || error.message);
    throw error;
  }
};

export const searchUser = async (userEmail) => {
  try {
    const response = await api.post(`/api/user`,{userEmail});
    return response.data;
  } catch (error) {
     if (error.response && error.response.status === 404) {
      return { success: false, message: "User not found" };
    }

    console.error("User search failed:", error.response?.data || error.message);
    return { success: false, message: "Server error" };
  }
};

export const updateProfilePicture = async (imageFile) => {
  try {
   
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await api.put("/api/user/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Profile picture update failed:", error.response?.data || error.message);
    throw error;
  }
};