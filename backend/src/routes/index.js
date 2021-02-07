var express = require('express');
var router = express.Router();

let controller = require('../controllers/controller');

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
