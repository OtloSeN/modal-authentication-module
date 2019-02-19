const express = require('express');
const config = require('config');

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());


// startup requires
require('./startup/db')();

app.use('/users', users);
app.use('/auth', auth);

const hostConfig = config.get('hostConfig');
app.listen(hostConfig.port, hostConfig.hostname, () => console.log(`Listening on port 3000...`));