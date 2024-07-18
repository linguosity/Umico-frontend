'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { signIn as apiSignIn, signOut as apiSignOut, validateToken } from '../api/authOperations';

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await validateToken(token);
          if (userData.valid) {
            setUser({
              token,
              id: userData.user_id,
              username: userData.username,
              email: userData.email
            });
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);  // Ensure this is always called
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await apiSignIn(username, password);
      localStorage.setItem('authToken', data.token);
      setUser(data);
    } catch (error) {
      console.error('Sign in failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await apiSignOut();
      localStorage.removeItem('authToken');
      setUser(null);
    } catch (error) {
      console.error('Sign out failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
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