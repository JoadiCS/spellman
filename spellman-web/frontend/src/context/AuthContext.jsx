import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, loginRequest, logoutRequest } from '../services/authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('spellman_token');
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then((response) => setUser(response))
      .catch(() => {
        localStorage.removeItem('spellman_token');
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const data = await loginRequest(payload);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem('spellman_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
