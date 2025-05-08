const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subAdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        dashboard: Boolean,
        banner_config: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        slider_config: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        product_config: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        coupon: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        category: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        variants: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        brands: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        orders_config: {
            edit: Boolean,
            delete: Boolean
        },
        payments_methods: {  // Note: Fixed typo from "methods" to "methodss" to match your JSON
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        shipping_partners: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        },
        social_links: {
            create: Boolean,
            edit: Boolean,
            delete: Boolean
        }
    },
    role: {
        type: String,
        enum: ['super-admin', 'sub-admin'],
        default: 'sub-admin'
    },
    status: {
        type: Boolean,
        default: true
    },
    isAction: {
        type: Boolean,
        default: true
    },
    isSubAdmin: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// // Hash password before saving
// subAdminSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Method to compare passwords
// subAdminSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

const subAdminModel = mongoose.model('SubAdmin', subAdminSchema);
module.exports = subAdminModel;