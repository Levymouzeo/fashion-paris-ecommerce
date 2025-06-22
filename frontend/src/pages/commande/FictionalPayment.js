import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import api from '../../utils/api';

const FictionalPayment = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  // Simule la récupération de l'adresse de livraison et de l'ID utilisateur
  const deliveryAddressId = 1; // À remplacer par la vraie adresse sélectionnée
  const userId = 1; // À remplacer par l'ID de l'utilisateur connecté

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      setError('Votre panier est vide.');
      return;
    }

    setIsProcessing(true);
    setError('');

    const orderData = {
      total: cartTotal,
      status: 'paid', // Le paiement est "réussi" instantanément
      paymentMethod: 'fictional_card',
      UserId: userId,
      AddressId: deliveryAddressId,
      orderItems: cartItems.map(item => ({
        ProductId: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      // Simulation d'un délai de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await api.post('/orders', orderData);
      
      setOrderId(response.data.id);
      clearCart(); // Vider le panier après la commande
      
      // Pas de redirection immédiate pour montrer le message de succès
      // navigate(`/commande/succes/${response.data.id}`);

    } catch (err) {
      setError('Une erreur est survenue lors de la création de la commande.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderId) {
    return (
      <div>
        <h2>Paiement Réussi !</h2>
        <p>Votre commande n°{orderId} a été créée avec succès.</p>
        <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Finaliser ma commande</h2>
      <h3>Total à payer : {cartTotal.toFixed(2)} €</h3>
      <p>Ceci est une simulation de paiement. Aucune information bancaire n'est requise.</p>
      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Paiement en cours...' : 'Payer (Fictif)'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FictionalPayment; 