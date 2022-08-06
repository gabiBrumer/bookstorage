module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(200),
            unique: true,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    }, {
        tableName: 'users',
        timestamps: true
    })

    return User;
}