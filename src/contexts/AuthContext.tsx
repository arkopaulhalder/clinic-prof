import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, RegisterData } from '../types';
import { apiService } from '../utils/api';
import { API_ENDPOINTS } from '../constants/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        apiService.setToken(token);
        await getCurrentUser();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  const getCurrentUser = async () => {
    try {
      const response = await apiService.get<User>(API_ENDPOINTS.GET_USER);
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to get current user:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiService.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.success && response.data) {
        const { token: newToken, user: userData } = response.data;
        setToken(newToken);
        setUser(userData);
        apiService.setToken(newToken);
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const response = await apiService.post(API_ENDPOINTS.REGISTER, userData);

      if (response.success && response.data) {
        const { token: newToken, user: newUser } = response.data;
        setToken(newToken);
        setUser(newUser);
        apiService.setToken(newToken);
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const requestOTP = async (phone: string) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.REQUEST_OTP, { phone });
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to send OTP');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    apiService.setToken(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    requestOTP,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};