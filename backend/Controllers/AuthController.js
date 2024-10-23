const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import JWT for token generation
const UserModel = require("../Models/User"); // Import the User model for database interaction

// Signup function to register new users
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body; // Extracting name, email, and password from request body
        
        // Check if the user already exists in the database
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409) // 409 indicates conflict, user already exists
                .json({ message: 'User already exists, please login', success: false });
        }

        // If user doesn't exist, create a new user and hash their password for security
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10); // Hash the password before saving
        await userModel.save(); // Save the new user to the database

        // Send a successful response
        res.status(201) // 201 indicates resource created successfully
            .json({
                message: "Successfully signed up",
                success: true
            });
    } catch (err) {
        // If something goes wrong, send a 500 Internal Server Error response
        res.status(500).json({
            message: "Oops!! Internal server error",
            success: false
        });
    }
};

// Login function to authenticate existing users
const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and password from request body
        const errorMsg = 'Authentication failed: email or password is incorrect'; // Default error message

        // Check if user exists in the database
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false }); // 403 means forbidden
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: errorMsg, success: false }); // Invalid password
        }

        // If login is successful, generate a JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id }, // Payload contains user's email and ID
            process.env.JWT_SECRET, // JWT secret key from environment variables
            { expiresIn: '12h' } // Token is valid for 12 hours
        );

        // Send a successful response with the generated token and user details
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken, // Return the JWT token for future authentication
            email,
            name: user.name
        });

    } catch (err) {
        // If something goes wrong, send a 500 Internal Server Error response
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Function to handle forgotten password by allowing users to reset it
const forgotPass = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email and new password from request body

        // Check if the user exists in the database
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403) // 403 indicates that the user was not found
                .json({ success: false, message: 'User does not exist' });
        }

        // Hash the new password and update the user record
        user.password = await bcrypt.hash(password, 10); // Hash the new password for security
        await user.save(); // Save the updated password to the database

        // Send a successful response
        res.status(201).json({
            message: "Password changed successfully",
            success: true
        });
        
    } catch (err) {
        // If something goes wrong, send a 500 Internal Server Error response
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Export the functions so they can be used in other files
module.exports = {
    signup,
    login,
    forgotPass
};
