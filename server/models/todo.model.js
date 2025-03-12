import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
},{
    timestamps: true
})

export const User = mongoose.model("user", userSchema)