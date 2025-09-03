const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const User = require('./models/user.js');
const ExpressError = require('./utils/ExpressError.js');
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

// ✅ Load .env first
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// ✅ Get dbUrl early
const dbUrl = process.env.ATLAS_DB_URL || 'mongodb://localhost:27017/wanderlust';

main().then(() => {
    console.log('✅ Connected to MongoDB');
}).catch(err => {
    console.error('❌ MongoDB connection error:', err);
});
async function main() {
    await mongoose.connect(dbUrl);
}

// ✅ Set up Mongo session store
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET || 'thisshouldbeabettersecret'
    },
    touchAfter: 24 * 3600 // 1 day
});

store.on('error', function (e) {
    console.log('❌ Session store error', e);
});

// ✅ Session config
const sessionOptions = {
    store,
    secret: process.env.SECRET || 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

// ✅ Middleware setup
app.use(session(sessionOptions));
app.use(flash());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Global locals
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

// ✅ Routes
app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);

// ✅ Catch-all route
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// ✅ Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    res.status(statusCode).render('error.ejs', { statusCode, message });
});

// ✅ Start server
app.listen(8080, () => {
    console.log('🚀 Server is running on port 8080');
});
