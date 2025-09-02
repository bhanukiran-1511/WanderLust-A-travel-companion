const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync.js');
// const ExpressError = require('../utils/ExpressError.js');

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviwController = require('../controllers/review.js');

//Post Reviews routes
router.post('/', isLoggedIn, validateReview, wrapAsync(reviwController.postReview));

//Delete Reviews route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviwController.deleteReview));

module.exports = router;