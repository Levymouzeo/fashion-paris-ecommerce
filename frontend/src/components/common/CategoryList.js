import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const CategoryList = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ul>
      {categories.map(cat => (
        <li key={cat.id} onClick={() => onSelect && onSelect(cat)}>
          {cat.name}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
