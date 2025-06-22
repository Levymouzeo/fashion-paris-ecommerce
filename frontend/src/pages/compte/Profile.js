import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Profile = () => {
  // Supposons que l'ID de l'utilisateur est stocké ou récupérable
  // Ici, on va le chercher via une route /me
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Créez une route GET /users/me dans votre backend
    api.get('/users/me') 
       .then(res => setUser(res.data))
       .catch(err => console.error("Impossible de charger les infos utilisateur"));
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // La route PUT /users/:id doit vérifier que l'utilisateur modifie son propre profil
      await api.put(`/users/${user.id}`, { name: user.name, email: user.email });
      setMessage('Profil mis à jour avec succès !');
    } catch (err) {
      setMessage('Erreur lors de la mise à jour.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mon profil</h2>
      <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Nom" required />
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      {/* Tu peux ajouter un champ pour changer le mot de passe ici */}
      <button type="submit">Mettre à jour</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Profile;
