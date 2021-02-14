let db = require('../../database/models');
const storage = require('node-sessionstorage');

let AdministrationsController = {

  totalBalance: function (req, res, next) {
    
    db.Users.findOne({
      where: {
        email: storage.getItem('userLogged'),
      },
    }).then((user) => {
      db.Administrations.findAll({
        where: {
          user_id: user.id,
        },
      }).then((operations) => {
        let totalBalance = 0;

        operations.forEach((adm) => {
          if (adm.type == 1) {
            totalBalance += adm.amount;
          } else {
            totalBalance -= adm.amount;
          }
        });

        res.json({
          meta: {
            status: 200,
          },
          data: {
            totalBalance: totalBalance,
          },
        });
      });
    });
    
  },

  
  last10Operations: function (req, res, next) {

    db.Users.findOne({
      where: {
        email: "kippes.diego@gmail.com",
      },
    }).then((user) => {
      db.Administrations.findAll({
        where: {
          user_id: user.id,
        },
        limit: 10,
      }).then((operations) => {
        res.json({
          meta: {
            status: 200,
          },
          data: {
            last10Operations: operations,
          },
        });
      });
    });
  },




  listOperations: function(req, res, next) {

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
        message: "operation added"
      })
    
  },



  modifyOperation: (req, res, next) => {
    
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
      message: 'operation updated',
    });
    
  },

  deleteOperation: (req, res, next) => {
    
    
    db.Administrations.destroy({
      where: {
        id: req.params.id
      }
    })

    res.json({
      message: 'operation deleted',
    });
    
  },
};

module.exports = AdministrationsController;