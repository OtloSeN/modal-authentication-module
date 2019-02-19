const router = require('express').Router();

const { User, validateUser } = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send('Invalid input');

    let user = await User.findOne({ email: req.body.email });
    console.log(user)

    if(user) return res.status(400).send('User already exists');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await user.save()

    const token = user.generateAuthToken();
    
    res.header('x-auth-token', token).send(user);
});

module.exports = router;