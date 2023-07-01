//user model
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( "User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        tableName: 'user',
        modelName: 'User',
        timestamps: true
    }, )
    return User
 }