import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Mes commandes</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Commande #{order.id} - {order.status} - {order.total} €
            <a href={`/compte/commande/${order.id}`}>Voir détail</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
