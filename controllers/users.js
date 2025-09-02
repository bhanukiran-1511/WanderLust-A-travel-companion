const User = require('../models/user.js');

module.exports.getSignupForm = (req, res) => {
    // res.send('Sign Up Page');
    res.render('users/signup.ejs');
};

module.exports.createUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Wanderlust!');
            return res.redirect('/listings'); // add return to prevent falling through
        });
    }
    catch (e) {
        req.flash('error', e.message);
        return res.redirect('/signup'); // add return
    }
};

module.exports.getLoginForm = (req, res) => {   
    res.render('users/login.ejs');
};

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome to Wanderlust!');
    res.redirect(res.locals.redirectUrl || '/listings');
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'Logged out successfully!');
        res.redirect('/listings');
    });
};