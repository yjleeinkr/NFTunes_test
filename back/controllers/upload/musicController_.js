const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const bucketName = 'dappmusic';

const uploadMusic = (req, res) => {
  const fileName = req.file.filename;
  console.log(fileName);
};

module.exports = uploadMusic;
