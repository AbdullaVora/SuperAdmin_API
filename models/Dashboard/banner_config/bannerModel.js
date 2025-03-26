const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        desktopImage: {
            type: String,
            required: true,
        },
        mobileImage: {
            type: String,
            required: true,
        },
        relatedTo: {
            type: String,
        },
        category: {
            type: String,
        },
        subcategory: {
            type: String,
        },
        brand: {
            type: String
        },
        status: {
            type: Boolean,
            default: true,
        },
        bannerLink: {
            type: String,
            required: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const bannerModel = mongoose.model("banner", bannerSchema);

module.exports = bannerModel;