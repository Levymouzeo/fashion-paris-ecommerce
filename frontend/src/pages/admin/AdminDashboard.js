import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const dashboardStyles = {
  display: 'flex',
};

const navStyles = {
  width: '200px',
  padding: '20px',
  borderRight: '1px solid #ccc',
  height: '100vh',
};

const contentStyles = {
  flexGrow: 1,
  padding: '20px',
};

const AdminDashboard = () => {
  return (
    <div style={dashboardStyles}>
      <nav style={navStyles}>
        <h3>Dashboard Admin</h3>
        <ul>
          <li><Link to="/admin/products">Gestion Produits</Link></li>
          <li><Link to="/admin/orders">Gestion Commandes</Link></li>
          <li><Link to="/admin/users">Gestion Utilisateurs</Link></li>
          <li><Link to="/admin/categories">Gestion Catégories</Link></li>
          <li><Link to="/admin/blog">Gestion Blog</Link></li>
        </ul>
      </nav>
      <main style={contentStyles}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard; 