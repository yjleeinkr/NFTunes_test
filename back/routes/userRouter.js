const express = require('express');
const router = express.Router();
const { join, login, quit, editUserInfo, getAllUserInfo } = require('../controllers/userController');

router.post('/join', join);
router.post('/login', login);
router.delete('/quit/:account', quit);
router.patch('/editUser/:account', editUserInfo);
router.get('/getAllUserInfo', getAllUserInfo);

module.exports = router;
