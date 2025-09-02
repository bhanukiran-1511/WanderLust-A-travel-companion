const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const Listing = require("./models/listing.js");
const { reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');

// ✅ Authentication middleware
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    else next();
};

module.exports.saveRedirectedUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }   
    next();
};

// ✅ Validation middleware (fixed)
module.exports.validateListing = async (req, res, next) => {
    try {
        await listingSchema.validateAsync(req.body);
        next();
    } catch (err) {
        throw new ExpressError(400, err);
    }
};

// ✅ Validation middleware (fixed)
module.exports.validateListing = async (req, res, next) => {
    try {
        await listingSchema.validateAsync(req.body);
        next();
    } catch (err) {
        throw new ExpressError(400, err);
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validateAsync(req.body);
    if (error) {
        throw new ExpressError(400, error);
    }
    else next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
};