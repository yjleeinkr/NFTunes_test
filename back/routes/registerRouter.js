const express = require('express');
const router = express.Router();
const { thumbnail } = require('../controllers/Music/ThumbnailController');
const { upload } = require('../utils/multer.js');

router.post('/thumbnail', upload.single('file'), thumbnail);

module.exports = router;
