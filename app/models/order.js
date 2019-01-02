module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        username: {
            type: DataTypes.STRING
        },
        item: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    });
    return Order;
};
