module.exports = (sequelize, dataTypes) => {
  let alias = 'Users';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: dataTypes.STRING(100),
    },
    password: {
      type: dataTypes.STRING(100),
    },
  };
  let config = {
    tableName: 'users',
    timestamps: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsToMany(models.Administrations, {
      as: 'administrations',
      through: 'user_administration',
      foreignKey: 'user_id',
      otherKey: 'administration_id',
      timestamps: false,
    });
  };

  return User;
};
