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
    }
}));

export function validateUser(email, password) {
    let emailValid = email.length >= 3 && email.includes('@'); //Emails always contain @
    //Password must contain at least one number, letter and special character and must be at least 8 characters.
    let passwordValid = password.match("^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    //If both right return 0
    if (emailValid && passwordValid) {
        return 0;
    }
    //If both wrong return 3
    else if (!emailValid && !passwordValid) {
        return 3;
    }
    //If just one wrong then return 1 or 2 depending on if it was the email or if it was the password.
    else if (!emailValid) {
        return 1;
    }
    else {
        return 2;
    }
}