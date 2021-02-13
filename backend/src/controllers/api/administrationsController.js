let db = require('../../database/models');
const storage = require('node-sessionstorage');

let AdministrationsController = {

  totalBalance: function (req, res, next) {
    /* db.Administrations.findAll({
      include: [{ association: 'users', where: { email: "pablo@pablo.com" } }],
    }).then((administration) => {

      let totalBalance = 0;
      
      administration.forEach(adm => {
        if(adm.type == 1) {
          totalBalance += adm.amount;
        } else {
          totalBalance -= adm.amount;
        }
      })

      res.json({
        meta: {
          status: 200,
          state: 'OK',
          url: '/api/administrations' + req.url,
        },
        data: {
          totalBalance: totalBalance
        }
      });
    }); */
  },

  
  last10Operations: function (req, res, next) {
    /* db.Administrations.findAll({
      limit: 10
    })
    .then(administration => {

      res.json({
        meta: {
          status: 200,
          state: 'OK',
          url: '/api/administrations' + req.url,
        },
        data: {
          last10Operations: administration,
        },
      });

    }) */
  },

  listOperations: function(req, res, next) {
    console.log(req.session.userLogged);
    db.Users.findAll({
      include: [{ association: 'administrations' }],
      where: {
        email: storage.getItem('userLogged'),
      },
    }).then((administration) => {
      res.json(administration[0].administrations);
    });
  },


  

  addOperation: (req, res, next) => {
      console.log(req.body);
      db.Users.findOne({
        where: {
          email: storage.getItem('userLogged'),
        },
      }).then((user) => {
        db.Administrations.create({
          concept: req.body.concept,
          amount: req.body.amount,
          type: req.body.type,
          category: req.body.category,
          user_id: user.id,
        });
      });

      res.json({
        message: "oka"
      })
    
  },



  modifyOperation: (req, res, next) => {
    console.log(req.body);
    db.Administrations.update(
      {
        concept: req.body.concept,
        amount: req.body.amount,
        category: req.body.category,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.json({
      message: 'oka',
    });
    
  },

  deleteOperation: (req, res, next) => {
    
    console.log(req.params.id);
    db.Administrations.destroy({
      where: {
        id: req.params.id
      }
    })

    res.json({
      message: 'oka',
    });
    
  },
};

module.exports = AdministrationsController;