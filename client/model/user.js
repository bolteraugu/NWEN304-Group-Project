const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
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

function validateUser(user) {
    let emailValid = user.email.length >= 3 && user.email.contains('@');
    //Password must contain at least one number, letter and special character
    let passwordValid = user.password.contains("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"); 
    return emailValid && passwordValid;
}