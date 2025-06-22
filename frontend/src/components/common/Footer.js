import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* A propos */}
          <div>
            <h3 className="font-bold text-lg mb-2">Fashion Paris</h3>
            <p className="text-gray-400">
              Votre boutique de mode en ligne pour les dernières tendances.
            </p>
          </div>
          {/* Liens rapides */}
          <div>
            <h3 className="font-bold text-lg mb-2">Liens rapides</h3>
            <ul>
              <li><Link to="/catalogue" className="text-gray-400 hover:text-white">Catalogue</Link></li>
              <li><Link to="/compte" className="text-gray-400 hover:text-white">Mon Compte</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-2">Newsletter</h3>
            <p className="text-gray-400 mb-2">Restez informé des nouveautés et promotions.</p>
            {/* Vous pouvez intégrer votre NewsletterForm ici */}
            <form>
              <input type="email" placeholder="Votre email" className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"/>
              <button type="submit" className="w-full mt-2 p-2 bg-blue-600 rounded hover:bg-blue-700">S'inscrire</button>
            </form>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8 pt-4 border-t border-gray-700">
          © {new Date().getFullYear()} Fashion Paris. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 