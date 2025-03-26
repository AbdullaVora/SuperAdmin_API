const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["percentage", "amount"],
            required: true,
        },
        value: {
            type: Number,
            required: true,
            min: 0,
        },
        min_amount: {
            type: Number,
            required: true,
            min: 0,
        },
        dateDetail: {
            type: String,
            required: true,
        },
        maxUsage: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: Boolean,
            default: true,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const couponModel = mongoose.model("Coupon", CouponSchema);

module.exports = couponModel;