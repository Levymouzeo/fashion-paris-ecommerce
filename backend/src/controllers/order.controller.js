const db = require('../models');
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [OrderItem] });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [OrderItem] });
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, ...orderData } = req.body;
    const order = await Order.create(orderData);

    if (orderItems && Array.isArray(orderItems)) {
      for (const item of orderItems) {
        const product = await Product.findByPk(item.ProductId);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Stock insuffisant pour le produit ${product.name}` });
        }
        await product.update({ stock: product.stock - item.quantity });
        await OrderItem.create({ ...item, OrderId: order.id });
      }
    }
    const createdOrder = await Order.findByPk(order.id, { include: [OrderItem] });
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
    await order.update(req.body);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
    await order.destroy();
    res.json({ message: 'Commande supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });
    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 