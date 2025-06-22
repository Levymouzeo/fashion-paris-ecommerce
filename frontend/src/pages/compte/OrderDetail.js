import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => setOrder(null));
  }, [id]);

  if (!order) return <p>Commande non trouvée.</p>;

  return (
    <div>
      <h2>Détail de la commande #{order.id}</h2>
      <p>Status : {order.status}</p>
      <p>Total : {order.total} €</p>
      <ul>
        {order.OrderItems && order.OrderItems.map(item => (
          <li key={item.id}>
            Produit #{item.ProductId} - Quantité : {item.quantity} - Prix : {item.price} €
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
