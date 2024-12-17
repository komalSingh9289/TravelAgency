import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a token exists and fetch user info
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        } catch (err) {
          console.error('Error verifying token:', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/users/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setUser(user);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Signup function
  const signup = async (details) => {
    const response = await axios.post('http://localhost:5000/api/users/signup', details);
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {!loading ? children : <div className="text-center">Loading...</div>}
    </AuthContext.Provider>
  );
};
