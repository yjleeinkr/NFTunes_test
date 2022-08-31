const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const registerRouter = require('./registerRouter');
const subscribeRouter = require('./subscribeRouter');
router.use('/user', userRouter);
router.use('/register', registerRouter);
router.use('/subscribe', subscribeRouter);

module.exports = router;
