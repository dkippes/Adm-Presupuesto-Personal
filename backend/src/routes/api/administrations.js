var express = require('express');
var router = express.Router();

let administrationsController = require('../../controllers/api/administrationsController');

/* GET home page. */

router.get('/totalBalance', administrationsController.totalBalance);
router.get('/listOperations', administrationsController.listOperations);
router.get('/last10Operations', administrationsController.last10Operations);
router.post('/addOperation', administrationsController.addOperation);
router.put('/modifyOperation/:id', administrationsController.modifyOperation);
router.delete('/deleteOperation/:id', administrationsController.deleteOperation);

module.exports = router;
