'use strict';
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRouter = require('./routes/apiRouter');

app.use('/api', apiRouter);

app.listen(3000, function () { console.log('Server is ready'); });