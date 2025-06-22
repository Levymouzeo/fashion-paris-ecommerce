import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.length > 2) { // Lance la recherche après 3 caractères
      setIsLoading(true);
      try {
        const response = await api.get(`/products/search?q=${newQuery}`);
        setResults(response.data);
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Rechercher un produit..."
        style={{ width: '100%' }}
      />
      {isLoading && <p>Recherche en cours...</p>}
      
      {results.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          listStyle: 'none',
          padding: '10px',
          margin: 0,
          zIndex: 1000,
        }}>
          {results.map(product => (
            <li key={product.id}>
              <Link to={`/produit/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar; 