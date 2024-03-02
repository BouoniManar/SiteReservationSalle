const express=require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

// Register

router.post('/addUser',UserController.createUser);



// Login

router.post('/login',UserController.loginUser);
module.exports = router;