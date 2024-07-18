'use client'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signIn = async (username: string, password: string) => {
    try {
      const data = { username, password };
      console.log('Sending sign in data:', data);
      const response = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Sign in error details:', errorData);
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

export const validateToken = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/api/validate-token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Token validation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Token validation error:', error);
    throw error;
  }
};