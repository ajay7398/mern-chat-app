
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import React, { useContext, useEffect } from "react";
import { socket, UserContext } from './context/UserContext.jsx';
import Profile from './pages/Profile.jsx'
function App() {

  const {setOnlineUsers,user,selectedChat}=useContext(UserContext);
 useEffect(() => {
   if (user?._id) {
    socket.emit("userOnline", user._id);
  }
      socket.on("onlineUsers", (users) => {
    setOnlineUsers(users); // store in state
  });
 
  }, [user,selectedChat]);
  return (
    <>
     <Routes>
      
        {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
        <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }
      />
       <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }
      />
     </Routes>
    </>
  )
}

export default App
