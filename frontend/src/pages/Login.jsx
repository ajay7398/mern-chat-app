import React, { Component, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/userAPI.js";
import { UserContext } from "../context/UserContext.jsx";
import { getUserChats } from "../api/chatAPI.js";
function Login() {
  const { setUser,setChats } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then(async(data) => {
        setUser(data.user); // ✅ set the user in global context
        console.log("Login successful:", data.user);
          setTimeout(async () => {
        const chats = await getUserChats();
        setChats(chats);
        navigate("/");
      }, 200); // small delay ensures cookie available
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black text-white">
      <div className="w-[60%]   flex h-96 justify-between">
        <span className="w-1 bg-white "></span>
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-3 px-20 py-10 ring relative"
        >
          <h1 className="text-2xl font-bold">Welcome to the Login Page</h1>
          <p>Enter the email</p>
          <input
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            className="border-1 border-white bg-white text-black px-2 py-1 outline-none"
            type="text"
          />
          <p>Enter Your Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border-1 border-white bg-white text-black px-2 py-1 outline-none"
            type="password"
          />
          <button
            className="bg-orange-300 p-1 text-2xl font-bold text-black"
            type="submit"
          >
            Login
          </button>
          <p className="absolute bottom-6">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-blue-700">
              Signup here
            </Link>
          </p>
        </form>
        <span className="w-1 bg-white"></span>
      </div>
    </div>
  );
}

export default Login;
