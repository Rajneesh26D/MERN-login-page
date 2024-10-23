const Joi = require('joi'); // Import Joi for validation

// Signup Validation Middleware
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        // Validate 'name' field: must be a string, with a minimum length of 3 and max of 100, and is required
        name: Joi.string().min(3).max(100).required().messages({
            "string.base": "Name should be a type of text", // Message for incorrect type
            "string.empty": "Name is required", // Message for empty name
            "string.min": "Name should have a minimum length of 3", // Message for too short name
            "string.max": "Name should have a maximum length of 100", // Message for too long name
            "any.required": "Name is required" // Message for missing name
        }),
        // Validate 'email' field: must be a valid email and is required
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address", // Message for invalid email format
            "string.empty": "Email is required", // Message for empty email
            "any.required": "Email is required" // Message for missing email
        }),
        // Validate 'password' field: must be a string, with a minimum length of 6 and max of 20, and is required
        password: Joi.string().min(6).max(20).required().messages({
            "string.min": "Password should have a minimum length of 6", // Message for short password
            "string.max": "Password should have a maximum length of 20", // Message for long password
            "any.required": "Password is required" // Message for missing password
        })
    });

    // Perform validation
    const { error } = schema.validate(req.body);
    if (error) {
        // Return a 400 Bad Request if validation fails with the specific error message
        return res.status(400).json({ message: "Validation Error", error: error.details[0].message });
    }
    next(); // If validation passes, proceed to the next middleware or route handler
};

// Login Validation Middleware
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        // Validate 'email' field: must be a valid email and is required
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address", // Message for invalid email format
            "string.empty": "Email is required", // Message for empty email
            "any.required": "Email is required" // Message for missing email
        }),
        // Validate 'password' field: must be a string, with a minimum length of 4 and max of 100, and is required
        password: Joi.string().min(4).max(100).required().messages({
            "string.min": "Password should have a minimum length of 4", // Message for short password
            "string.max": "Password should have a maximum length of 100", // Message for long password
            "any.required": "Password is required" // Message for missing password
        })
    });

    // Perform validation
    const { error } = schema.validate(req.body);
    if (error) {
        // Return a 400 Bad Request if validation fails with the specific error message
        return res.status(400).json({ message: "Validation Error", error: error.details[0].message });
    }
    next(); // If validation passes, proceed to the next middleware or route handler
};

// Forgot Password Validation Middleware
const forgotPassValidation = (req, res, next) => {
    const schema = Joi.object({
        // Validate 'email' field: must be a valid email and is required
        email: Joi.string().email().required().messages({
            "string.email": "Please enter a valid email address", // Message for invalid email format
            "string.empty": "Email is required", // Message for empty email
            "any.required": "Email is required" // Message for missing email
        }),
        // Validate 'password' field: must be a string, with a minimum length of 6 and max of 20, and is required
        password: Joi.string().min(6).max(20).required().messages({
            "string.min": "Password should have a minimum length of 6", // Message for short password
            "string.max": "Password should have a maximum length of 20", // Message for long password
            "any.required": "Password is required" // Message for missing password
        })
    });

    // Perform validation
    const { error } = schema.validate(req.body);
    if (error) {
        // Return a 400 Bad Request if validation fails with the specific error message
        return res.status(400).json({ message: "Validation Error", error: error.details[0].message });
    }
    next(); // If validation passes, proceed to the next middleware or route handler
};

// Export the validation middleware functions
module.exports = {
    signupValidation,
    loginValidation,
    forgotPassValidation
};
