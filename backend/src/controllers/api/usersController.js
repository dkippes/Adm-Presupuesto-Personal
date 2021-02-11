let db = require('../../database/models');

let usersController = {
  userList: function (req, res, next) {
    db.Users.findAll().then((users) => {
      res.json(users);
    });
  },

  userRegistration: function (req, res, next) {

    console.log(req.body);

    db.Users.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      console.log(user);
      if (user == null) {
        db.Users.create({
          email: req.body.email,
          password: req.body.password,
        });

        res.json({
          messageOK: 'Usuario registrado con exito',
        });
      }

      res.json({
          messageError: 'Usuario ya existe'
      });
    });
  },

  login: function (req, res, next) {
    db.Users.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if(user == null) {
        res.json({
          messageError: 'El usuario no existe',
        });
      } else {
        if(user.password == req.body.password) {
          req.session.userLogged = user.email;
          console.log(req.session.userLogged);
          res.json({
            messageOK: 'Usuario logeado con exito'
          });
        } else {
          res.json({
            messageError: 'Error de credenciales',
          });
        }
      }
      
    })
  },
};

module.exports = usersController;