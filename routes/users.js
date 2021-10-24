const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isNotLoggedIn} = require("../middleware")
const users = require('../controllers/users')

router.route('/register')
    .get(isNotLoggedIn, users.registerFrom)
    .post(catchAsync(users.registerNewUser));

router.route('/login')
    .get(isNotLoggedIn, users.loginForm)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.loginUser)

router.get('/logout', users.logout)

module.exports = router;