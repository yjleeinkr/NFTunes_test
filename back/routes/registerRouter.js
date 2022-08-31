const express = require('express');
const router = express.Router();
const { thumbnail } = require('../controllers/Music/ThumbnailController');
const Music = require('../controllers/Music/MusicController');
const { upload } = require('../utils/multer.js');

router.post('/thumbnail', upload.single('cover'), thumbnail);
router.post('/music', upload.single('music'), Music);
module.exports = router;
