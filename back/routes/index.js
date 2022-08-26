const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const registerRouter = require('./registerRouter');
router.use('/user', userRouter);
router.use('/register', registerRouter);

module.exports = router;
