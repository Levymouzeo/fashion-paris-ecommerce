import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const emptyForm = { title: '', content: '', image: '', published: false };

const BlogAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.get('/blogposts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/blogposts/${editingId}`, form);
      } else {
        await api.post('/blogposts', form);
      }
      const res = await api.get('/blogposts');
      setPosts(res.data);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = post => {
    setForm(post);
    setEditingId(post.id);
  };

  const handleDelete = async id => {
    if (window.confirm('Supprimer cet article ?')) {
      await api.delete(`/blogposts/${id}`);
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Gestion des articles de blog</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title} ({post.published ? 'Publié' : 'Brouillon'})
            <button onClick={() => handleEdit(post)}>Modifier</button>
            <button onClick={() => handleDelete(post.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <h3>{editingId ? 'Modifier' : 'Ajouter'} un article</h3>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" required />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Contenu" required />
        <label>
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
          Publié
        </label>
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
        {editingId && <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Annuler</button>}
      </form>
    </div>
  );
};

export default BlogAdmin;
