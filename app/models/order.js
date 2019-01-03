module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        itemId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        orderNumber: {
            type: DataTypes.INTEGER
        },
        shopper: {
            type: DataTypes.STRING
        },
        delivered: {
            type: DataTypes.BOOLEAN
        }
    });
    return Order;
};
