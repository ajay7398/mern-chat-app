// src/components/PublicRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext) // or useContext(UserContext)

  if (loading) return <div>Loading...</div>; // Wait until token is verified
  if (user) return <Navigate to="/" replace />; // Already logged in → redirect home

  return children; // Not logged in → show login/signup
};

export default PublicRoute;
