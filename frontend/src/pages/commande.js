import React, { useState } from 'react';
import api from '../utils/api';

const Checkout = ({ cartItems, addressId, paymentMethod }) => {
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    try {
      const orderData = {
        total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        paymentMethod,
        AddressId: addressId,
        orderItems: cartItems.map(item => ({
          ProductId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };
      await api.post('/orders', orderData);
      setMessage('Commande passée avec succès !');
      // Vider le panier ici si besoin
    } catch (err) {
      setMessage('Erreur lors de la commande');
    }
  };

  return (
    <div>
      <button onClick={handleOrder}>Valider la commande</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkout;
