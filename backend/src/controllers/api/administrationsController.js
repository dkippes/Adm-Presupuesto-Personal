let db = require('../../database/models');

let AdministrationsController = {

  totalBalance: function (req, res, next) {
    db.Administrations.findAll({
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
    });
  },

  
  last10Operations: function (req, res, next) {
    db.Administrations.findAll({
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

    })
  },


  

  addOperation: (req, res, next) => {
    db.Administrations.create({
      concept: req.body.concept,
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
    });

    res.json({
      meta: {
        status: 200,
        state: 'OK',
        url: '/api/administrations' + req.url,
      },
    });
  },



  modifyOperation: (req, res, next) => {
    console.log(req.params.id);
    db.Administrations.update(
      {
        concept: req.body.concept,
        amount: req.body.amount,
        category: req.body.category,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.json({
      meta: {
        status: 200,
        state: 'OK',
        url: '/api/administrations' + req.url,
      },
    });
  },

  deleteOperation: (req, res, next) => {
    console.log(req.params.id);
    db.Administrations.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      meta: {
        status: 200,
        state: 'OK',
        url: '/api/administrations' + req.url,
      },
    });
  },
};

module.exports = AdministrationsController;