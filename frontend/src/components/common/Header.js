import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Fashion Paris
        </Link>

        {/* Barre de recherche */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* Liens de navigation & Icônes */}
        <nav className="flex items-center space-x-4">
          <Link to="/catalogue" className="text-gray-600 hover:text-gray-800">Catalogue</Link>
          <Link to="/blog" className="text-gray-600 hover:text-gray-800">Blog</Link>
          
          {isAuthenticated ? (
            <>
              {user?.role === 'admin' && <Link to="/admin" className="text-blue-600 hover:text-blue-800 font-semibold">Admin</Link>}
              <Link to="/compte" className="text-gray-600 hover:text-gray-800">Mon Compte</Link>
              <button onClick={logout} className="text-gray-600 hover:text-gray-800">Déconnexion</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-800">Connexion</Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-800">Inscription</Link>
            </>
          )}

          <Link to="/panier" className="relative">
            <svg className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 