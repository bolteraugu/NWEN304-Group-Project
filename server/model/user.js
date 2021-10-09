import mongoose from "mongoose";

//Create User Data Model
export const User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    cookbookID: {
        type: String,
        required: true,
    },
    recentSearches: {
        type: Array,
        required: true,
        maxlength: 7
    }
}));