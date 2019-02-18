const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/passwords', {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => console.log('Connected to DB...'))
        .catch(err => console.log(err));
}