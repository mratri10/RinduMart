module.exports = (sequelize, Datatypes) => {
    const Region = sequelize.define('Region', {
        id: {
            type: Datatypes.STRING,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nama: {
            type: Datatypes.STRING,
            allowNull: false
        },
        kodepos: {
            type: Datatypes.SMALLINT,
            allowNull: false
        },
    }, {
        tableName: 'region',
        timestamps: false,
        underscored: false,
    })

    return Region
}