const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

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

function validate(user) {
    const schema = {
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

const User = mongoose.model('users', userSchema);

module.exports.validateUser = validate;
module.exports = User;