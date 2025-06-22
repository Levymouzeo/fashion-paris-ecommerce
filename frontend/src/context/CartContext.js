import React, { createContext, useState, useEffect } from 'react';

// 1. Créer le contexte
export const CartContext = createContext();

// 2. Créer le Provider (le composant qui fournira l'état et les fonctions)
export const CartProvider = ({ children }) => {
  // On initialise le panier depuis le localStorage pour la persistance
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  // Chaque fois que le panier change, on le sauvegarde dans le localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Si le produit existe déjà, on augmente la quantité
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Sinon, on l'ajoute avec une quantité de 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  // Fonction pour vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcul du total
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 