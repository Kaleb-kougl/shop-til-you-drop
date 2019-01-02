module.exports = (sequelize, DataTypes) => {
    const Demo = sequelize.define('Demo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        }
    });
    return Demo;
};
