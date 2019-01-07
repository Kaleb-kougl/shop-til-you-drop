module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        item: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        orderNumber: {
            type: DataTypes.INTEGER,
            defaultValue: 777,
            allowNull: false
        },
        shopper: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'none'
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'inCart',
            allowNull: false
        }
    });
    return Cart;
};
