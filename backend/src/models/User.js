module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: { type: DataTypes.ENUM('client', 'admin'), defaultValue: 'client' },
    phone: DataTypes.STRING,
  });
  User.associate = models => {
    User.hasMany(models.Order);
    User.hasMany(models.Review);
    User.hasMany(models.Address);
  };
  return User;
};
