import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setToken } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/auth/me')
      .then((data) => setUser(data.user))
      .catch(() => setToken(''))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      async login(email, password) {
        const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
        setToken(data.token);
        setUser(data.user);
      },
      async register(name, email, password) {
        const data = await api('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
        setToken(data.token);
        setUser(data.user);
      },
      logout() {
        setToken('');
        setUser(null);
      }
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

