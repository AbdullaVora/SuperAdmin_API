const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const User = require('../../models/auth/userModel');

dotenv.config();

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Decrypt stored password
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = CryptoJS.AES.encrypt(user._id.toString(), process.env.SECRET_KEY).toString();

        res.status(200).json({ message: 'Login successful', token, user: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Encrypt password
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

        // Create new user
        const newUser = new User({
            email,
            password: encryptedPassword
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

        // Send response with token and email
        res.status(201).json({ message: "User registered successfully", email: newUser.email, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { loginUser, registerUser };
