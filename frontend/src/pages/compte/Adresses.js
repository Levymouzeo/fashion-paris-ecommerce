import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({ street: '', city: '', postalCode: '', country: '' });
  const [editingId, setEditingId] = useState(null);

  // Charger les adresses de l'utilisateur connecté
  useEffect(() => {
    api.get('/address')
      .then(res => setAddresses(res.data))
      .catch(err => console.error(err));
  }, []);

  // Gérer la saisie du formulaire
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ajouter ou modifier une adresse
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/address/${editingId}`, form);
      } else {
        await api.post('/address', form);
      }
      // Recharge la liste
      const res = await api.get('/address');
      setAddresses(res.data);
      setForm({ street: '', city: '', postalCode: '', country: '' });
      setEditingId(null);
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  // Préparer la modification
  const handleEdit = address => {
    setForm(address);
    setEditingId(address.id);
  };

  // Supprimer une adresse
  const handleDelete = async id => {
    if (window.confirm('Supprimer cette adresse ?')) {
      await api.delete(`/address/${id}`);
      setAddresses(addresses.filter(a => a.id !== id));
    }
  };

  return (
    <div>
      <h2>Mes adresses</h2>
      <ul>
        {addresses.map(addr => (
          <li key={addr.id}>
            {addr.street}, {addr.city}, {addr.postalCode}, {addr.country}
            <button onClick={() => handleEdit(addr)}>Modifier</button>
            <button onClick={() => handleDelete(addr.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <h3>{editingId ? 'Modifier' : 'Ajouter'} une adresse</h3>
      <form onSubmit={handleSubmit}>
        <input name="street" value={form.street} onChange={handleChange} placeholder="Rue" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" required />
        <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Code postal" required />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Pays" required />
        <button type="submit">{editingId ? 'Modifier' : 'Ajouter'}</button>
        {editingId && <button type="button" onClick={() => { setForm({ street: '', city: '', postalCode: '', country: '' }); setEditingId(null); }}>Annuler</button>}
      </form>
    </div>
  );
};

export default Addresses;
