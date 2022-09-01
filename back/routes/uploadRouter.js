const express = require('express');
const router = express.Router();
const { thumbnail } = require('../controllers/upload/ThumbnailController');
const Music = require('../controllers/upload/MusicController');
const uploadMusic = require('../controllers/upload/musicController_');
const { upload } = require('../utils/multer.js');

router.post('/thumbnail', upload.single('cover'), thumbnail);
router.post('/music', upload.single('music'), Music);
router.post('/music_', upload.single('music'), uploadMusic);

module.exports = router;
