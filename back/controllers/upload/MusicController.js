const { google } = require('googleapis');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_PW;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const fs = require('fs');
const path = require('path');
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const uploadMusicFile = async (file) => {
  console.log(file.path);
  try {
    const response = await drive.files.create({
      requestBody: {
        name: '1',
        mimeType: 'audio/mpeg',
      },
      media: {
        mimeType: 'audio/mpeg',
        body: fs.createReadStream(file.path),
      },
    });
    console.log(response.data);
  } catch (e) {
    console.log(e.message);
  }
};
const Music = async (req, res) => {
  const result = req.file;
  console.log(' 음성파일입니다.', result);
  uploadMusicFile(result);
};

module.exports = Music;
