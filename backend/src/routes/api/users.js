var express = require('express');
var router = express.Router();

let usersController = require('../../controllers/api/usersController');

/* GET home page. */
router.get('/', usersController.index);

module.exports = router;
