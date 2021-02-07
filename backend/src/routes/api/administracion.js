var express = require('express');
var router = express.Router();

let administracionController = require('../../controllers/api/administracionController');

/* GET home page. */
router.get('/', administracionController.index);

module.exports = router;
