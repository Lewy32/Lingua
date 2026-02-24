import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { setAuthToken, getAuthToken, setUserData, getUserData, clearAllData } from '../services/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await getAuthToken();
      if (token) {
        const userData = await getUserData();
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token exists but no user data, fetch from API
          const response = await authAPI.getMe();
          if (response.data.success) {
            setUser(response.data.user);
            await setUserData(response.data.user);
            setIsAuthenticated(true);
          }
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
      await clearAllData();
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password });
      if (response.data.success) {
        const { token, user: userData } = response.data;
        await setAuthToken(token);
        await setUserData(userData);
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success) {
        const { token, user: userData } = response.data;
        await setAuthToken(token);
        await setUserData(userData);
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = async () => {
    try {
      await clearAllData();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    setUserData({ ...user, ...updates });
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getMe();
      if (response.data.success) {
        setUser(response.data.user);
        await setUserData(response.data.user);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
