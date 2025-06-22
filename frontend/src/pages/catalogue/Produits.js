import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Produits = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => setProduits(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Catalogue</h2>
      <ul>
        {produits.map(prod => (
          <li key={prod.id}>
            {prod.name} - {prod.price} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Produits;
