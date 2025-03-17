import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        todos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "todo",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const User = mongoose.model("user", userSchema);
