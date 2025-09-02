const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}).populate("owner");
    res.render("listings/index.ejs", { allListings });
};

module.exports.searchListings = async (req, res) => {
    const { q } = req.query;
    let allListings = [];
    let searchQuery = '';

    if (q && q.trim()) {
        searchQuery = q.trim();
        // Search in title, location, country, and description
        allListings = await Listing.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
                { country: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } }
            ]
        }).populate("owner");
    } else {
        allListings = await Listing.find({}).populate("owner");
    }

    res.render("listings/index.ejs", { allListings, searchQuery });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let currListing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!currListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { currListing });
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    // req.body.listing.image = { url, filename };
    //
    await listingSchema.validateAsync(req.body);
    const newListing = new Listing(req.body.listing);
    newListing.image = { url, filename }; // ✅ add image data
    newListing.owner = req.user._id; // ✅ set logged-in user as owner
    await newListing.save();
    req.flash("success", "New Listing Created Successfully!");
    res.redirect(`/listings/${newListing._id}`);
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    let currListing = await Listing.findById(id);
    if (!currListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { currListing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename }; // ✅ update image data
        await updatedListing.save();
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${updatedListing._id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deleted = await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};