import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const emptyForm = { name: '', description: '' };

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, form);
      } else {
        await api.post('/categories', form);
      }
      const res = await api.get('/categories');
      setCategories(res.data);
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = cat => {
    setForm(cat);
    setEditingId(cat.id);
  };

  const handleDelete = async id => {
    if (window.confirm('Supprimer cette catégorie ?')) {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <h2>Gestion des catégories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {cat.name}
            <button onClick={() => handleEdit(cat)}>Modifier</button>
            <button onClick={() => handleDelete(cat.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <h3>{editingId ? 'Modifier' : 'Ajouter'} une catégorie</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
        {editingId && <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }}>Annuler</button>}
      </form>
    </div>
  );
};

export default CategoryAdmin;
