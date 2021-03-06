const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send('Invalid password');

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password');

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();

    res.send(token);
});

function validateUser(user) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

module.exports = router;