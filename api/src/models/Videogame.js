const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    description: {
       type : DataTypes.TEXT,
       allowNull: false
    },
    releaseDate : {
       type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    },
    platforms: {
      type: DataTypes.ARRAY(Sequelize.TEXT)
    },
    image: {
      type: DataTypes.STRING
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  },
  {
    timestamps: false
  });
};
