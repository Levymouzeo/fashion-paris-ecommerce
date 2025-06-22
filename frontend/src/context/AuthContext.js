import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../utils/api';

// 1. Créer le contexte
export const AuthContext = createContext();

// 2. Créer le Provider
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    user: null,
    isLoading: true, // Pour gérer le chargement initial
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Vérifie si le token est expiré
        if (decodedToken.exp * 1000 > Date.now()) {
          // Si le token est valide, on peut considérer l'utilisateur comme authentifié
          // Idéalement, on récupère les infos utilisateur complètes depuis le backend
          setAuth({
            token: token,
            isAuthenticated: true,
            user: { id: decodedToken.id, role: decodedToken.role }, // Infos de base du token
            isLoading: false,
          });
        } else {
          // Token expiré
          localStorage.removeItem('token');
          setAuth({ token: null, isAuthenticated: false, user: null, isLoading: false });
        }
      } catch (error) {
        // Token invalide
        localStorage.removeItem('token');
        setAuth({ token: null, isAuthenticated: false, user: null, isLoading: false });
      }
    } else {
      setAuth({ token: null, isAuthenticated: false, user: null, isLoading: false });
    }
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    const { token } = response.data;
    const decodedToken = jwtDecode(token);

    localStorage.setItem('token', token);
    setAuth({
      token: token,
      isAuthenticated: true,
      user: { id: decodedToken.id, role: decodedToken.role },
      isLoading: false,
    });
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      token: null,
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  const value = {
    ...auth, // Expose token, isAuthenticated, user, isLoading
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 