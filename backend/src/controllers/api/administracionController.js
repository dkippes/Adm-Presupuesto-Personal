let db = require('../../database/models');

let AdministracionController = {
  index: function (req, res, next) {
    db.Administrations.findAll({
      include: [{ association: 'users' }],
    }).then((prueba) => {
      console.log(prueba);
      res.json(prueba);
    });
  },
};

module.exports = AdministracionController;