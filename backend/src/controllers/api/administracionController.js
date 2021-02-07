let db = require('../../database/models');

let AdministracionController = {
  index: function (req, res, next) {
    db.Prueba.findAll()
      .then(prueba => {
        console.log(prueba);
        res.json(prueba)
      })
  },
};

module.exports = AdministracionController;