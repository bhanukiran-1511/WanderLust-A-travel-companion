const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js"); // ✅ import User model

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    // ✅ find a user to use as owner
    let user = await User.findOne();
    if (!user) {
        // if no user exists, create a default one
        user = new User({ username: "adminUser", email: "admin@example.com" });
        await User.register(user, "password123"); // using passport-local-mongoose
        console.log("Default user created:", user);
    }

    // ✅ assign the found/created user as owner
    const listingsWithOwner = initdata.data.map((obj) => ({
        ...obj,
        owner: user._id,
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log("Database initialized with sample data and owner assigned!");
};

initDB();
