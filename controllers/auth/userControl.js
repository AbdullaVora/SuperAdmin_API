const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const User = require('../../models/auth/userModel');
const jwt = require('jsonwebtoken')

dotenv.config();

const loginUser = async (req, res) => {
    try {
        const { email, mobile, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        // Check if at least one identifier is provided
        if (!email && !mobile) {
            return res.status(400).json({ message: 'Email or mobile is required' });
        }

        // Build the query based on provided identifier
        const query = email ? { email } : { mobile };
        // console.log(query);
        // Check if user exists
        const user = await User.findOne(query);
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

        res.status(200).json({ message: 'Login successful', token, name: user.name, id: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // Build the query based on provided identifier
        const query = email ? { email } : { mobile };

        // Check if user already exists
        const existingUser = await User.findOne(query);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Encrypt password
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

        // Create new user
        const newUser = new User({
            name,
            mobile,
            email,
            password: encryptedPassword
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.SECRET_KEY, { expiresIn: "1h" });

        // Send response with token and email
        res.status(200).json({ message: "User registered successfully", name, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const formatData = users.map((user) => ({
            _id: user._id,
            name: user.name,
            mobile: user.mobile,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
        }))
        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(formatData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const updateUsers = async (req, res) => {
    try {
        const { id } = req.params
        const users = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params
        const users = await User.findByIdAndDelete(id);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = { loginUser, registerUser, getUsers, updateUsers, deleteUsers };
