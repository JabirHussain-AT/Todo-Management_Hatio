import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { AuthContextType } from '../interface/IAuthContext';
import { BACKEND_URL } from '../constants/constants';
import { IUser } from '../interface/IUser';
import { config } from '../constants/config';


interface AuthProviderProps {
    children: ReactNode;
  }


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children } : any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState< IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/auth/check`,config);
      if( response.data.isAuthenticated ){
          setIsAuthenticated(true);
          setUser(response.data.user);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
    //   await axios.post('/api/auth/login', { email, password });
      await checkAuth();
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};