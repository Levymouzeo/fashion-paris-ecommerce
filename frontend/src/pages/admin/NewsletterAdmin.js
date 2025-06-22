import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const NewsletterAdmin = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    api.get('/newsletters')
      .then(res => setEmails(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async id => {
    if (window.confirm('Supprimer cette inscription ?')) {
      await api.delete(`/newsletters/${id}`);
      setEmails(emails.filter(e => e.id !== id));
    }
  };

  return (
    <div>
      <h2>Liste des inscrits à la newsletter</h2>
      <ul>
        {emails.map(e => (
          <li key={e.id}>
            {e.email}
            <button onClick={() => handleDelete(e.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsletterAdmin;
