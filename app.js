const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());

/**
 * Startup requires
 */
require('./startup/db')();

app.use('/users', users);
app.use('/auth', auth);

app.listen(3000, () => console.log(`Listening on port 3000...`));