import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Vous devez être connecté pour laisser un avis.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await api.post('/reviews', {
        productId,
        rating,
        comment
      });
      
      setComment('');
      setRating(5);
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi de l'avis.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-center text-gray-600">
          Connectez-vous pour laisser un avis sur ce produit.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Laisser un avis</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Note</label>
          <select 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Très bien</option>
            <option value={3}>3 - Bien</option>
            <option value={2}>2 - Moyen</option>
            <option value={1}>1 - Décevant</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Commentaire</label>
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Partagez votre expérience avec ce produit..."
            required
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button 
          type="submit" 
          disabled={submitting}
          className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {submitting ? 'Envoi en cours...' : 'Envoyer l\'avis'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm; 