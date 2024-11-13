const express = require('express');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const verifyToken = require('../middleware/authmiddleware');
const Asset = require('../models/assetModel'); // Updated import for the model
const router = express.Router();

router.use(cookieParser());
router.use(express.json());

// Create a new user (POST /add-user)
router.post("/add-user", verifyToken, async (req, res) => {
    try {
        const { userId, username, userphone, userplace } = req.body;

        // Check if a user with the same userId already exists
        const existingUser = await Asset.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ error: "User with this ID already exists" });
        }

        // Create a new user
        const newUser = new Asset({ userId, username, userphone, userplace });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Read all users (GET /users)
router.get("/users", verifyToken, async (req, res) => {
    try {
        const users = await Asset.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});

// Read a single user by userId (GET /user/:userId)
router.get("/user/:userId", verifyToken, async (req, res) => {
    try {
        const user = await Asset.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

// Update a user by userId (PUT /user/:userId)
router.put("/edit-user/:userId", verifyToken, async (req, res) => {
    try {
        const { username, userplace, userphone } = req.body;
        const updatedUser = await Asset.findOneAndUpdate(
            { userId: req.params.userId },
            { username, userplace, userphone },
            { new: true } // Return the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
});

// Delete a user by userId (DELETE /user/:userId)
router.delete("/delete-user/:userId", verifyToken, async (req, res) => {
    try {
        const deletedUser = await Asset.findOneAndDelete({ userId: req.params.userId });
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;
