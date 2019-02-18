const router = require('express').Router();
const { validateUser, User } = require('../models/user');

router.post('/', (req, res) => {
    const { error } = validateUser(req.body);
    if(error) res.status(400).send('Invalid input');

    let user = User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already exist');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
        .then(user => res.send(user))
        .catch(err => res.send(err));
});

module.exports = router;