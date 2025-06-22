import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Panier = () => {
  const { cartItems, removeFromCart, cartTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <h2>Votre panier est vide.</h2>;
  }

  return (
    <div>
      <h2>Votre Panier</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span> - Quantité : {item.quantity}</span>
            <span> - {item.price * item.quantity} €</span>
            <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <h3>Total : {cartTotal.toFixed(2)} €</h3>
      <button>Passer à la caisse</button>
    </div>
  );
};

export default Panier;
