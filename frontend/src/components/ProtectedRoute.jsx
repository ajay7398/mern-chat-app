import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user,loading} = useContext(UserContext);
  if (loading) return <div className="text-slate-600 w-[100%] h-screen"><p className="m-auto text-6xl">Loading...</p></div>; // wait until verified
  if (!user) return <Navigate to="/login" replace />; // no token → go to login
  return children; // token valid → render component
};

export default ProtectedRoute;
