'use client'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      const response = await fetch(`${API_URL}/api/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }
  } catch (error) {
    console.error('Sign out error:', error);
  } finally {
    localStorage.removeItem('authToken');
  }
};