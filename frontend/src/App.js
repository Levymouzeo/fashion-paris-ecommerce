import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages publiques
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProduitDetail from './pages/produit/ProduitDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/blog/BlogDetail';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Panier from './pages/panier';
import Commande from './pages/commande';

// Pages Compte Utilisateur (protégées)
import Profile from './pages/compte/Profile';
import Orders from './pages/compte/Orders';
import OrderDetail from './pages/compte/OrderDetail';
import Adresses from './pages/compte/Adresses';

// Pages Admin (protégées)
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryAdmin from './pages/admin/CategoryAdmin';
import NewsletterAdmin from './pages/admin/NewsletterAdmin';
import BlogAdmin from './pages/blog/BlogAdmin';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                {/* Routes Publiques */}
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/produit/:id" element={<ProduitDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/panier" element={<Panier />} />
                <Route path="/commande" element={<Commande />} />

                {/* Routes Utilisateur Protégées */}
                <Route path="/compte" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/compte/commandes" element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/compte/commandes/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
                <Route path="/compte/adresses" element={<PrivateRoute><Adresses /></PrivateRoute>} />

                {/* Routes Admin Protégées */}
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/categories" element={<AdminRoute><CategoryAdmin /></AdminRoute>} />
                <Route path="/admin/blog" element={<AdminRoute><BlogAdmin /></AdminRoute>} />
                <Route path="/admin/newsletter" element={<AdminRoute><NewsletterAdmin /></AdminRoute>} />

              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App; 