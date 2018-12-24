module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      username: DataTypes.STRING,
      
    });
    return Order;
  };
  