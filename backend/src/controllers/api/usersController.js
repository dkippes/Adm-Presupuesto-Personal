let db = require('../../database/models');

let usersController = {
  userList: function (req, res, next) {
    db.Users.findAll()
      .then(users => {
        res.json(users);
      })
  },

  userRegistration: function (req, res, next) {

    db.Users.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      console.log(user);
      if(user == null) {

        db.Users.create({
          email: req.body.email,
          password: req.body.password,
        });

        res.json({
          meta: {
            status: 200,
            state: 'OK',
            url: '/api/users' + req.url,
          },
        });
 
      }

      res.json({
        meta: {
          status: 250,
          state: 'OK',
          message: 'Usuario ya existe',
          url: '/api/users' + req.url,
        },
      });

      
    })
  },
};

module.exports = usersController;