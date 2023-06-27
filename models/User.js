module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        role: Datatypes.SMALLINT,
        token: Datatypes.STRING,
        createdAt: {
            type: Datatypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Datatypes.DATE,
            allowNull: false
        },

    }, {
        tableName: 'users'
    })

    return User
}