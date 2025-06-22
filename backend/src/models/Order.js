module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled'), defaultValue: 'pending' },
    total: DataTypes.FLOAT,
    paymentMethod: DataTypes.STRING,
    trackingNumber: DataTypes.STRING,
  });
  Order.associate = models => {
    Order.belongsTo(models.User);
    Order.hasMany(models.OrderItem);
    Order.belongsTo(models.Address);
  };
  return Order;
};


