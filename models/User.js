module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define('User', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        age: {
            type: Datatypes.SMALLINT,
            allowNull: false
        },
        address: Datatypes.STRING,
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