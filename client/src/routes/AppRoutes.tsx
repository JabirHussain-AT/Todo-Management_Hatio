
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/SignUp";
import Loading from "../components/Loadng";
import ProjectDetails from "../pages/user/ProjectDetials";
import { useAuth } from "../context/AuthContextFun";
import { useEffect } from "react";
import { Navigate, Route,  Routes } from "react-router-dom";



const AppRoutes = () => {
    const { isAuthenticated, loading, checkAuth } = useAuth();
  
    useEffect(() => {
      checkAuth();
    }, []);
  
    if (loading) {
      return < Loading />; 
    }
  
    return (
      <Routes>
        { isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    );
  };


  export default AppRoutes