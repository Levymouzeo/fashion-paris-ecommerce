import React, { useState } from 'react';
import api from '../../utils/api';

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/reviews', {
        ProductId: productId,
        rating,
        comment
      });
      setMessage('Avis envoyé avec succès !');
      setRating(5);
      setComment('');
      // Recharge la liste des avis dans le composant parent
      if (onReviewSubmit) onReviewSubmit();
    } catch (err) {
      setMessage('Erreur lors de l\'envoi de l\'avis.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Laisser un avis</h4>
      <select value={rating} onChange={e => setRating(e.target.value)}>
        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Votre commentaire"
        required
      />
      <button type="submit">Envoyer</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ReviewForm;
