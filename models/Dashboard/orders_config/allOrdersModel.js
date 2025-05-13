// const mongoose = require('mongoose');

// const ordersSchema = new mongoose.Schema(
//     {
//         orderCode: {
//             type: String,
//             trim: true,
//         },
//         email: {
//             type: String,
//             trim: true,
//         },
//         firstName: {
//             type: String,
//             trim: true,
//         },
//         lastName: {
//             type: String,
//             trim: true,
//         },
//         billing: {
//             address: {
//                 type: String,
//             },
//             city: {
//                 type: String,
//             },
//             state: {
//                 type: String,
//             },
//             zipCode: {
//                 type: String,
//             }
//         },
//         shipping: { // Same structure as billing if they're the same
//             address: {
//                 type: String,
//             },
//             city: {
//                 type: String,
//             },
//             state: {
//                 type: String,
//             },
//             zipCode: {
//                 type: String,
//             }
//         },
//         payment: {
//             paymentMethod: {
//                 type: String,
//             },
//             paymentMode: {
//                 type: String,
//             },
//             paymentKey: {
//                 type: String,
//             },
//             cardDetails: {
//                 cardNumber: String,
//                 cardName: String,
//                 expiryDate: String,
//                 cvv: String,
//                 savePaymentInfo: Boolean
//             },
//             upiDetails: {
//                 upiId: String
//             }
//         },
//         cart: [{
//             // Define structure based on your cart items
//             type: mongoose.Schema.Types.Mixed
//         }],
//         appliedCoupon: {
//             type: mongoose.Schema.Types.Mixed
//         },
//         subtotal: {
//             type: Number,
//         },
//         discount: {
//             type: Number,
//             default: 0,
//         },
//         shippingFee: {
//             type: Number,
//             default: 0,
//         },
//         total: {
//             type: Number,
//         },
//         status: {
//             type: Boolean,
//             default: true, // true = active, false = inactive
//         },
//     },
//     {
//         timestamps: true, // Adds createdAt and updatedAt automatically
//     }
// );

// const AllOrders = mongoose.model('allOrders', ordersSchema);

// module.exports = AllOrders; // Fix: was 'allOrders' but should be 'AllOrders'

const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        orderCode: {
            type: String,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        paymentMethod: {
            type: String,
        },
        paymentMode: {
            type: String,
            enum: ['test', 'live'],
        },
        paymentKey: {
            type: String,
        },
        cardDetails: {
            type: {
                cardNumber: {
                    type: String,
                    required: function () { return this.paymentMethod === 'Credit' || this.paymentMethod === 'Debit'; }
                },
                cardName: {
                    type: String,
                    required: function () { return this.paymentMethod === 'Credit' || this.paymentMethod === 'Debit'; }
                },
                expiryDate: {
                    type: String,
                    required: function () { return this.paymentMethod === 'Credit' || this.paymentMethod === 'Debit'; }
                },
                cvv: {
                    type: String,
                    required: function () { return this.paymentMethod === 'Credit' || this.paymentMethod === 'Debit'; }
                },
                savePaymentInfo: {
                    type: Boolean,
                    default: false
                }
            },
            required: false
        },
        upiDetails: {
            type: {
                upiId: String
            },
            required: false
        },
        cart: [{

            // productId: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'Product', // Reference to your Product model if you have one
            //     required: true
            // },
            product: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            variant: {
                id: String,
                data: [{
                    label: String,
                    value: String
                }]
            },
            thumbnail: String,
            mainImage: String
        }],
        appliedCoupon: {
            couponId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Coupon' // Reference to your Coupon model if you have one
            },
            name: String,
            type: {
                type: String,
                enum: ['percentage', 'amount']
            },
            value: Number,
            minAmount: Number
        },
        subtotal: {
            type: Number,
            required: true,
            min: 0
        },
        discount: {
            type: Number,
            default: 0,
            min: 0
        },
        shippingFee: {
            type: Number,
            default: 0,
            min: 0
        },
        total: {
            type: Number,
            required: true,
            min: 0
        },
        orderStatus: {
            type: String,
            // enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
            // enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],

            default: 'pending'
        },
        status: {
            type: Boolean,
            default: true // true = active, false = inactive
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'],
            default: 'pending'
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Add indexes for better query performance
// ordersSchema.index({ email: 1 });
// ordersSchema.index({ orderCode: 1 });
// ordersSchema.index({ status: 1 });
// ordersSchema.index({ paymentStatus: 1 });
// ordersSchema.index({ createdAt: -1 });

const 



AllOrders = mongoose.model('allOrders', ordersSchema);

module.exports = AllOrders; // Fix: was 'allOrders' but should be 'AllOrders'