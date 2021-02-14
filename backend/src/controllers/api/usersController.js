let db = require('../../database/models');
const storage = require('node-sessionstorage');

let usersController = {
  userList: function (req, res, next) {
    console.log(req.session.userLogged);
    db.Users.findAll().then((users) => {
      res.json(users);
    });
  },

  userRegistration: function (req, res, next) {


    db.Users.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      
      if (user == null) {
        
        db.Users.create({
          email: req.body.email,
          password: req.body.password,
        });

        res.json({
          meta: {
            status: 200,
          },
          data: {
            message: 'Usuario registrado con exito',
          },
        });

        
      }

      res.json({
        meta: {
          status: 404,
        },
        data: {
          message: 'usuario existente',
        },
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
            status: 400,
          },
          data: {
            message: 'El usuario no existe',
          },
        });
      } else {
        if(user.password == req.body.password) {

          storage.setItem('userLogged', user.email);
          
          res.json({
            meta: {
              status: 200
            },
            data: {
              message: "Usuario logeado con exito"
            }
          });
        } else {
          res.json({
            meta: {
              status: 404,
            },
            data: {
              message: 'Error de credenciales',
            },
          });
        }
      }
      
    })
  },
};

module.exports = usersController;