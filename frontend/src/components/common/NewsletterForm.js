import React, { useState } from 'react';
import api from '../../utils/api';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/newsletters', { email });
      setMessage('Inscription réussie !');
      setEmail('');
    } catch (err) {
      setMessage('Erreur : cet email est peut-être déjà inscrit.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Votre email"
        required
      />
      <button type="submit">S'inscrire à la newsletter</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default NewsletterForm;
