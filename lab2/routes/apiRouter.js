const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const planetRouter = require('./planetRouter');

router.use('/users', userRouter);
router.use('/planets', planetRouter);

module.exports = router;