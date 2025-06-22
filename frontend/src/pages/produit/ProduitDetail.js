import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { CartContext } from '../../context/CartContext';

const ProduitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/products/${id}`);
        setProduit(response.data);
      } catch (err) {
        console.error('Erreur lors de la récupération du produit:', err);
        setError('Produit non trouvé');
      } finally {
        setLoading(false);
      }
    };

    fetchProduit();
  }, [id]);

  const handleAddToCart = () => {
    if (produit) {
      addToCart(produit, quantity);
      // Optionnel : afficher un message de confirmation
      alert('Produit ajouté au panier !');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error || !produit) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Produit non trouvé</h2>
        <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
        <button 
          onClick={() => navigate('/catalogue')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour au catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image du produit */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={produit.image || 'https://via.placeholder.com/500x600'} 
            alt={produit.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Informations du produit */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{produit.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">{produit.price.toFixed(2)} €</p>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{produit.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Stock disponible : <span className="font-semibold">{produit.stock} unités</span>
            </p>
          </div>

          {/* Sélecteur de quantité */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quantité :</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(Math.min(10, produit.stock))].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <button 
              onClick={handleAddToCart}
              disabled={produit.stock === 0}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {produit.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
            </button>
            
            <button 
              onClick={() => navigate('/catalogue')}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Retour au catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProduitDetail;
