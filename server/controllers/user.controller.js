// controllers/user.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { JWT_EXPIRY_TIME, JWT_SECRET_KEY } from "../config/env/index.js";

export class UserController {
    // Signup - Create a new user
    static createUser = async (_, { name, username, password }) => {
        try {
            // Check if username already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error("Username already taken");
            }
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user
            const user = new User({
                name,
                username,
                password: hashedPassword,
            });
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to signup: " + error.message);
        }
    };

    // Signin - Login user
    static signinUser = async (_, { username, password }) => {
        try {
            // Find user by username
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error("User not found");
            }
            // Compare provided password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid password");
            }
            // Generate a JWT token for the user
            const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
                expiresIn: JWT_EXPIRY_TIME,
            });
            console.log(token, "<<< here");
            return { token }; // Return token
        } catch (error) {
            console.log(error);
            throw new Error("Failed to signin: " + error.message);
        }
    };

    // Get user by token
    static getUserByToken = async (_, { token }) => {
        try {
            // Verify the JWT token
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            // Fetch the user based on the decoded user ID
            const user = await User.findById(decoded.id).populate("todos");
            if (!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to get user by token: " + error.message);
        }
    };

    // Update user details (except password)
    static updateUser = async (_, { id, name, username, password }) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            // Update user fields
            if (name) {
                user.name = name;
            }
            if (username) {
                user.username = username;
            }
            // If password is provided, hash it and update
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Failed to update user: " + error.message);
        }
    };
    // Delete a user
    static deleteUser = async (_, { id }) => {
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                throw new Error("User not found");
            }
            return { message: `User with id ${id} deleted successfully` };
        } catch (error) {
            console.log(error);
            throw new Error("Failed to delete user: " + error.message);
        }
    };
}
