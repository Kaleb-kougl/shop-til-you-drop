module.exports = (sequelize, DataTypes) => {
    const Demo = sequelize.define('Demo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activeuser: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    });
    return Demo;
};
