
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import React, { useEffect } from "react";
import { socket } from './context/UserContext.jsx';
function App() {
 useEffect(() => {
    // Listen when connected
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    
  }, []);
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
     </Routes>
    </>
  )
}

export default App
