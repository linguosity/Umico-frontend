import React, { createContext, useState, useContext, useEffect } from 'react';
import { signIn, signOut } from '../api/authOperations';

interface AuthContextType {
  user: any | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Check for existing auth token in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Validate token and set user
      // This is a placeholder, implement actual token validation
      setUser({ token });
    }
  }, []);

  const handleSignIn = async (username: string, password: string) => {
    try {
      const data = await signIn(username, password);
      localStorage.setItem('authToken', data.token);
      setUser(data);
    } catch (error) {
      console.error('Sign in failed', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out failed', error);
      // Even if the server request fails, we still want to clear the user state
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn: handleSignIn, signOut: handleSignOut }}>
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