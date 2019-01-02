module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        // id: {
        //     type: DataTypes.INTEGER
        // },
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
        cartname: {
            type: DataTypes.STRING
        },
        shopper: {
            type: DataTypes.STRING
        },
        pending: {
            type: DataTypes.BOOLEAN
        }
    });
    return Cart;
};
