const express = require('express');
const router = express.Router();
const { join, login, quit, editUserInfo } = require('../controllers/userController');

router.post('/join', join);
router.post('/login', login);
router.delete('/quit/:account', quit);
router.patch('/editUser/:account', editUserInfo);

module.exports = router;
