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

module.exports = { login, register };