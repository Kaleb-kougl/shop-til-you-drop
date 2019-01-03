module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
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
        status: {
            type: DataTypes.STRING
        }
    });
    return Cart;
};
