const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    token: String
});

const User = model('Users', userSchema);
module.exports = User;