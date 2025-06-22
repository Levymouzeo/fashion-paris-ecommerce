module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  });
  Product.associate = models => {
    Product.belongsTo(models.Category);
    Product.hasMany(models.Review);
    Product.hasMany(models.OrderItem);
  };
  return Product;
};
