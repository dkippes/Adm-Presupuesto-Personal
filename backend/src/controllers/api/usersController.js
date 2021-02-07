let db = require('../../database/models');

let usersController = {
  index: function (req, res, next) {
    db.Prueba.findAll()
      .then(prueba => {
        console.log(prueba);
        res.json(prueba)
      })
  },
};

module.exports = usersController;