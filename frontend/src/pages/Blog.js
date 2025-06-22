import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/blogposts');
        // On ne garde que les articles publiés
        setPosts(response.data.filter(post => post.published));
      } catch (error) {
        console.error("Erreur lors de la récupération du blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center">Chargement du blog...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Notre Blog</h1>
      <div className="space-y-8">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">
              <Link to={`/blog/${post.id}`} className="hover:text-blue-600">{post.title}</Link>
            </h2>
            <p className="text-gray-600">Publié le {new Date(post.createdAt).toLocaleDateString()}</p>
            {/* Vous pourriez ajouter un extrait du contenu ici */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 