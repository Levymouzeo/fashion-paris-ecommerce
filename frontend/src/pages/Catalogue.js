import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';

const Catalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du catalogue:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center">Chargement du catalogue...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Notre Catalogue</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
            <Link to={`/produit/${product.id}`} className="block">
              <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"/>
            </Link>
            <div className="p-4">
              <h3 className="font-bold text-lg truncate">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.price.toFixed(2)} €</p>
              <button 
                onClick={() => addToCart(product)}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue; 