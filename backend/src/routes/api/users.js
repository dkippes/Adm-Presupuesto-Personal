var express = require('express');
var router = express.Router();

let usersController = require('../../controllers/api/usersController');

/* GET home page. */
router.get('/', usersController.userList);
router.post('/register', usersController.userRegistration);

module.exports = router;
