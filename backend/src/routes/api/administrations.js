var express = require('express');
var router = express.Router();

let administrationsController = require('../../controllers/api/administrationsController');

/* GET home page. */
router.get('/totalBalance', administrationsController.totalBalance);
router.get('/last10Operations', administrationsController.last10Operations);
router.post('/addOperation', administrationsController.addOperation);
router.post('/modifyOperation/:id', administrationsController.modifyOperation);
router.post('/deleteOperation/:id', administrationsController.deleteOperation);

module.exports = router;
