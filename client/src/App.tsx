import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from "./context/AuthContextFun";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import ProjectDetails from './pages/user/ProjectDetials';

const AppRoutes = () => {
  const { isAuthenticated, loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;