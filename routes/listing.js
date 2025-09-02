const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");


const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

// ---------------- ROUTES ----------------
router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

// 📌 Search route
router.get('/search', wrapAsync(listingController.searchListings));

// 📌 New listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);



// 📌 Update route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// 📌 Edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;
