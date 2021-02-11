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
          meta: {
            status: 225,
            state: 'ERROR',
            message: 'El usuario no existe',
            url: '/api/users' + req.url,
          },
        });
      } else {
        if(user.password == req.body.password) {
          res.json({
            meta: {
              status: 200,
              state: 'OK',
              url: '/api/users' + req.url,
            },
          });
        } else {
          res.json({
            meta: {
              status: 250,
              state: 'ERROR',
              message: 'Error de credenciales',
              url: '/api/users' + req.url,
            },
          });
        }
      }
      
    })
  },
};

module.exports = usersController;