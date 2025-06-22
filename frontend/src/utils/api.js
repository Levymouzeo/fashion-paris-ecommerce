import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Changement du port ici

const api = axios.create({
  baseURL: API_URL,
});

// Pour ajouter automatiquement le token JWT si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
