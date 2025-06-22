import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import api from '../../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/users/register', formData);
      // Redirige vers la page de connexion après une inscription réussie
      navigate('/login'); 
    } catch (err) {
      setError('Erreur lors de l\'inscription. Cet email est peut-être déjà utilisé.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un compte</h2>
      <input type="text" name="name" onChange={handleChange} placeholder="Nom" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Mot de passe" required />
      <button type="submit">S'inscrire</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};

export default Register;
