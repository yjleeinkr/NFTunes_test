const express = require('express');
const router = express.Router();
const { join, login, quit, editUserInfo, checkJoinForm } = require('../controllers/userController');

router.post('/join', join);
router.post('/login', login);
router.delete('/quit/:account', quit);
router.patch('/editUser/:account', editUserInfo);
router.post('/checkJoinForm', checkJoinForm);

module.exports = router;
