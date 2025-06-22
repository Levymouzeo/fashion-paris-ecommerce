import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);
    // Vérifie si le token n'est pas expiré et si le rôle est 'admin'
    return decodedToken.role === 'admin' && decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

const AdminRoute = () => {
  // Si l'utilisateur est admin, on affiche le contenu de la route (via Outlet)
  // Sinon, on le redirige vers la page d'accueil ou de login
  return isAdmin() ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute; 