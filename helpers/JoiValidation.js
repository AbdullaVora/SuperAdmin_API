const Joi = require("joi");
const { isValidPhoneNumber } = require('libphonenumber-js');



// Login validation schema
const login = Joi.object({
    email: Joi.string().email().allow("").messages({
        "string.email": "Email must be a valid email address"
    }),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,}$/)
        .messages({
            "string.pattern.base": "Password must be at least 7 characters long and include one uppercase letter, one number, and one special character"
        })
}).custom((value, helpers) => {
    if (!value.email && !value.password) {
        return helpers.message("All fields are required");
    }
    return value;
});

const profileValidation = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z\s]+$/)
      .min(3)
      .allow("")
      .messages({
        "string.pattern.base": "Name must contain only alphabets and spaces",
        "string.min": "Name must be at least 3 characters long",
      }),
  
    email: Joi.string()
      .email()
      .allow("")
      .messages({
        "string.email": "Email must be a valid email address",
      }),
  
    mobile: Joi.string().custom((value, helpers) => {
      if (value === "") return value;
      const mobileStr = String(value);
      if (!isValidPhoneNumber(mobileStr)) {
        return helpers.message("Phone number must be valid (include country code if needed)");
      }
      return mobileStr;
    }),
  
    password: Joi.string()
      .min(7)
      .pattern(/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/)
      .messages({
        "string.min": "Password must be at least 7 characters long",
        "string.pattern.base": "Password can only contain letters, numbers, and special characters",
      }),
  }).custom((value, helpers) => {
    if (!value.name && !value.email && !value.mobile && !value.password) {
      return helpers.message("All field is required");
    }
    return value;
  });
  

const register = Joi.object({
    name: Joi.string()
        .pattern(/^[A-Za-z\s]+$/)
        .min(3)
        .allow("")
        .messages({
            "string.pattern.base": "Name must contain only alphabets and spaces",
            "string.min": "Name must be at least 3 characters long"
        }),
    email: Joi.string()
        .email()
        .allow("")
        .messages({
            "string.email": "Email must be a valid email address"
        }),
    mobile: Joi.string().custom((value, helpers) => {
        if (value === "") return value;
        const mobileStr = String(value);
        if (!isValidPhoneNumber(mobileStr)) {
            return helpers.message("Phone number must be valid (include country code if needed)");
        }
        return mobileStr;
    }),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{7,}$/)
        .allow("")
        .messages({
            "string.pattern.base": "Password must be at least 7 characters long and include one uppercase letter, one number, and one special character"
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
        .pattern(/^[A-Za-z\s]+$/)
        .min(3)
        .allow("")
        .messages({
            "string.pattern.base": "Name must contain only alphabets and spaces",
            "string.min": "Name must be at least 3 characters long"
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address'
        }),
    number: Joi.string().custom((value, helpers) => {
        if (value === "") return value;
        const mobileStr = String(value);
        if (!isValidPhoneNumber(mobileStr)) {
            return helpers.message("Phone number must be valid (include country code if needed)");
        }
        return mobileStr;
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

const orderValidation = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.empty': 'First name is required',
            'string.pattern.base': 'First name must contain only letters',
        }),

    lastName: Joi.string()
        .min(2)
        .max(30)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.empty': 'Last name is required',
            'string.pattern.base': 'Last name must contain only letters',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'string.empty': 'Email is required',
        }),

    city: Joi.string()
        .min(2)
        .max(50)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
            'string.empty': 'City is required',
            'string.pattern.base': 'City must contain only letters and spaces',
        }),

    state: Joi.string()
        .min(2)
        .max(10)
        .pattern(/^[a-zA-Z\s]+$/)
        .required()
        .messages({
            'string.pattern.base': 'State must contain only letters and spaces',
            'string.empty': 'State is required',
        }),

    zipCode: Joi.string()
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            'string.pattern.base': 'Zip code must be a 6-digit number',
            'string.empty': 'Zip code is required',
        }),

});


module.exports = { login, register, createInquiryJoi, profileValidation, orderValidation };