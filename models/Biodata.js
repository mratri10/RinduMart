module.exports = (sequelize, DataTypes) => {
  const Biodata = sequelize.define('Biodata', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    marriage: {
      type: DataTypes.SMALLINT
    },
    religion: {
      type: DataTypes.SMALLINT
    },
    education: {
      type: DataTypes.SMALLINT
    },
    numberId: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }

  }, {
    tableName: 'biodata'
  })

  return Biodata
}