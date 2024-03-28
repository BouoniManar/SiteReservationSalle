const express=require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

// Register

router.post('/register',UserController.createUser);


// Login

router.post('/login',UserController.loginUser);


router.get('/logout', UserController.logout);
router.get('/signup', UserController.signupForm);
router.get('/signin', UserController.loginForm);

module.exports = router;