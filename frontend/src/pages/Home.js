import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Tentative de récupération des produits...');
        const response = await api.get('/products');
        console.log('Produits récupérés:', response.data);
        // On prend les 4 premiers produits pour l'exemple
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setError('Impossible de charger les produits');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Section Hero */}
      <div className="bg-cover bg-center h-96 text-white flex items-center justify-center rounded-lg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="text-center bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-5xl font-extrabold mb-4">Nouvelle Collection</h1>
          <p className="text-xl mb-6">Découvrez les dernières tendances de la mode parisienne.</p>
          <Link to="/catalogue" className="bg-white text-gray-800 font-bold py-3 px-6 rounded hover:bg-gray-200 transition-colors duration-300">
            Voir le catalogue
          </Link>
        </div>
      </div>

      {/* Section Produits Mis en Avant */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Nos Produits Phares</h2>
        
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Chargement des produits...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600">Vérifiez que le serveur backend est démarré sur le port 3001</p>
          </div>
        )}

        {!loading && !error && featuredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Aucun produit disponible pour le moment.</p>
          </div>
        )}

        {!loading && !error && featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Link to={`/produit/${product.id}`}>
                  <img 
                    src={product.image || 'https://via.placeholder.com/300'} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      console.log('Erreur de chargement image pour:', product.name, product.image);
                      e.target.src = 'https://via.placeholder.com/300';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-600 mt-2">{product.price.toFixed(2)} €</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 