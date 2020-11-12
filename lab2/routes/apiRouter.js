const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const planetRouter = require('./planetRouter');
const mediaRouter = require('./mediaRouter');

router.use('/users', userRouter);
router.use('/planets', planetRouter);
router.use('/media', mediaRouter);

module.exports = router;