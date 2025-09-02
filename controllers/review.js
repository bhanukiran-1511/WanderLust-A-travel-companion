const Review = require('../models/review.js');
const Listing = require('../models/listing.js');

module.exports.postReview = async (req, res) => {
    let currListing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    currListing.reviews.push(newReview);

    await newReview.save();
    await currListing.save();
    req.flash('success', 'Review created succesfully!');
    res.redirect(`/listings/${currListing._id}`);
};

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted succesfully!');
    res.redirect(`/listings/${id}`);
};