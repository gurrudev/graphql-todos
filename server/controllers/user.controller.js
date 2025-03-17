import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { JWT_EXPIRY_TIME, JWT_SECRET_KEY } from "../config/env/index.js";

export class UserController {
    static createUser = async (_, { name, username, password }) => {
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error("Username already taken");
            }
            const hashedPassword = await bcrypt.hash(password, 10);
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
    static signinUser = async (_, { username, password }) => {
        try {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error("User not found");
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid password");
            }
            const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
                expiresIn: JWT_EXPIRY_TIME,
            });
            return { token };
        } catch (error) {
            console.log(error);
            throw new Error("Failed to signin: " + error.message);
        }
    };
    static getUserByToken = async (_, { token }) => {
        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
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
    static updateUser = async (_, { id, name, username, password }) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            if (name) {
                user.name = name;
            }
            if (username) {
                user.username = username;
            }
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
