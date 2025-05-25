import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { getUserByCredentials } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid stored user data',
        });
      }
    } else {
      setAuthState(prevState => ({ ...prevState, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = getUserByCredentials(email, password);
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Invalid email or password',
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'An error occurred during login',
      });
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<void> => {
    setAuthState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would create a new user in the backend
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        role: 'user',
        createdAt: new Date(),
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'An error occurred during registration',
      });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    setAuthState(prevState => ({ ...prevState, isLoading: true, error: null }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (authState.user) {
        const updatedUser = { ...authState.user, ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAuthState({
          user: updatedUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState(prevState => ({
        ...prevState,
        isLoading: false,
        error: 'An error occurred while updating profile',
      }));
    }
  };

  const value = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};