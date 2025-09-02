const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectedUrl } = require('../middleware.js');

const userController = require('../controllers/users.js');


// ---------------- ROUTES ----------------
router.route('/signup')
    .get(userController.getSignupForm)
    .post(wrapAsync(userController.createUser));

router.route('/login')
    .get(userController.getLoginForm)
    .post(saveRedirectedUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.loginUser); 

router.get('/logout', userController.logoutUser );

module.exports = router;