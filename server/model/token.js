import mongoose from "mongoose";
import pkg from 'mongoose';

const {Schema} = pkg;
export const Token = mongoose.model('Token', new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
    used: {
        type: Boolean,
        default: false,
    }
}));