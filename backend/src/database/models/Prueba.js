module.exports = (sequelize, dataTypes) => {
  let alias = 'Prueba';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: dataTypes.STRING(45),
    }
  };
  let config = {
    tableName: 'prueba',
    timestamps: false,
  };

  const Prueba = sequelize.define(alias, cols, config);

  return Prueba;
};
