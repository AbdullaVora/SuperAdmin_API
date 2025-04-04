
// Create a new banner

const bannerModel = require("../../../models/Dashboard/banner_config/bannerModel");

// Create a new banner
exports.createBanner = async (req, res) => {
    try {
        const banner = await bannerModel.create(req.body);
        res.status(201).json({ success: true, data: banner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all banners
exports.getBanners = async (req, res) => {
    try {
        const banners = await bannerModel.find();
        // Format sliders data
        const formattedBanner = banners.map((banner) => ({
            _id: banner._id,
            name: banner.name,
            desktopImage: banner.desktopImage,
            mobileImage: banner.mobileImage,
            forPage: banner.forPage,
            forSection: banner.forSection,
            relatedTo: banner.relatedTo,
            bannerCategory: banner.category,
            bannerSubcategory: banner.subcategory,
            description: banner.description || '',
            brand: banner.brand,
            // bannerLink: banner.bannerLink,
            updatedAt: banner.updatedAt,
            // createdAt: slider.createdAt,
            status: banner.status,
            isAction: true,
            isBanner: true,
        }));

        res.status(200).json(formattedBanner);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single banner by ID
exports.getBannerById = async (req, res) => {
    try {
        const banner = await bannerModel.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }
        res.status(200).json({ success: true, data: banner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a banner by ID
exports.updateBanner = async (req, res) => {
    try {
        const banner = await bannerModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a banner by ID
exports.deleteBanner = async (req, res) => {
    try {
        const banner = await bannerModel.findByIdAndDelete(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }
        res.status(200).json({ success: true, message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
