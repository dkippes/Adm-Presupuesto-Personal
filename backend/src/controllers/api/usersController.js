let db = require('../../database/models');

let usersController = {
  index: function (req, res, next) {
    db.Users.findAll({
      include: [{ association: 'administrations' }],
    }).then((prueba) => {
      console.log(prueba);
      res.json(prueba);
    });
  },
};

module.exports = usersController;