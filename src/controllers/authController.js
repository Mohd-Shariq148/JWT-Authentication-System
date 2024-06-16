const User = require('../models/userModel');
const { generateToken } = require('../utils/tokenUtils');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Create a new instance of User model
        const user = new User({ username, password });
        
        // Save user to the database
        await user.save();
        
        // Respond with success message
        res.status(200).json({ message: 'User registration successful' });
    } catch (error) {
        // Handle registration failure
        console.error('User registration failed:', error);
        res.status(400).json({ message: 'User registration failed' });
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by username in the database
        const user = await User.findOne({ username });

        // If user not found or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token for authenticated user
        const token = generateToken(user._id);
        
        // Respond with the generated token
        res.json({ token });
    } catch (error) {
        // Handle login failure
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Login failed' });
    }
};
exports.getMe = async (req, res) => {
    try {
        // Retrieve user ID from decoded JWT token
        const userId = req.user.id;
        
        // Find user by ID in the database, exclude password field
        const user = await User.findById(userId).select('-password');
        
        // If user not found, return appropriate error response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Respond with user data
        res.json(user);
    } catch (error) {
        // Handle error if failed to retrieve user
        console.error('Failed to retrieve user:', error);
        res.status(500).json({ message: 'Failed to retrieve user' });
    }
};
exports.logout = (req, res) => {
    // Handle logout if necessary (e.g., clear JWT token from client-side)
    // For token-based authentication, often handled client-side by removing the token
    res.json({ message: 'Logged out successfully' });
};
