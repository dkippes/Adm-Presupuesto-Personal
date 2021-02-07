module.exports = (sequelize, dataTypes) => {
  let alias = 'Administrations';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    concept: {
      type: dataTypes.STRING(100),
    },
    amount: {
      type: dataTypes.STRING(100),
    },
    date: {
      type: dataTypes.DATE,
    },
    type: {
      type: dataTypes.INTEGER,
    },
    category: {
      type: dataTypes.STRING(100),
    },
  };
  let config = {
    tableName: 'administrations',
    timestamps: false,
  };

  const Administration = sequelize.define(alias, cols, config);

  Administration.associate = function (models) {
    Administration.belongsToMany(models.Users, {
      as: 'users',
      through: 'user_administration',
      foreignKey: 'administration_id',
      otherKey: 'user_id',
      timestamps: false,
    });
  };

  return Administration;
};
