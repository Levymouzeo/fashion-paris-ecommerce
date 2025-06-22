import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <header>Chargement...</header>;
  }

  return (
    <header>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/catalogue">Catalogue</Link>
        {isAuthenticated ? (
          <>
            <Link to="/compte">Mon Compte ({user?.role})</Link>
            {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={logout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </nav>
      <SearchBar />
    </header>
  );
};

export default Header;
