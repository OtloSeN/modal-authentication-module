const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
}

function validate(user) {
    const schema = {
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}
const User = mongoose.model('users', userSchema);

module.exports = {
    User,
    validateUser: validate
}