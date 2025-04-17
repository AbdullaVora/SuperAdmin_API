const Joi = require("joi");

// Login validation schema
const login = Joi.object({
    email: Joi.string().email().allow("").messages({
        "string.email": "Email must be a valid email address"
    }),
    password: Joi.string().min(6).allow("").messages({
        "string.min": "Password must be at least 6 characters long"
    })
}).custom((value, helpers) => {
    if (!value.email && !value.password) {
        return helpers.message("All fields are required");
    }
    return value;
});

// Register validation schema
const register = Joi.object({
    name: Joi.string().min(3).allow("").messages({
        "string.min": "Name must be at least 3 characters long"
    }),
    email: Joi.string().email().allow("").messages({
        "string.email": "Email must be a valid email address"
    }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).allow("").messages({
        "string.pattern.base": "Phone number must be a valid 10-digit number"
    }),
    password: Joi.string().min(6).allow("").messages({
        "string.min": "Password must be at least 6 characters long"
    })
}).custom((value, helpers) => {
    if (!value.name && !value.email && !value.mobile && !value.password) {
        return helpers.message("All fields are required");
    }
    return value;
});

// Validation schema for creating an inquiry
const createInquiryJoi = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name should have at least {#limit} characters',
            'string.max': 'Name should not exceed {#limit} characters'
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address'
        }),
    number: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Phone number must be between 10-15 digits'
        }),
    message: Joi.string()
        .min(10)
        .max(1000)
        .required()
        .messages({
            'string.empty': 'Message is required',
            'string.min': 'Message should have at least {#limit} characters',
            'string.max': 'Message should not exceed {#limit} characters'
        })
});


module.exports = { login, register, createInquiryJoi };