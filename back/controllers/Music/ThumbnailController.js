const pinataSDK = require('@pinata/sdk');
require('dotenv').config();
const pinata = pinataSDK(process.env.API_KEY, process.env.API_SECRET);
const Cover = require('../../models/coverModel');
const fs = require('fs');
const sourcePath = '/home/gyuri/project/last/dApp_Store/back/';

const thumbnail = async (req, res) => {
  const result = req.file;
  console.log(result);

  if (result?.filename.length != 0) {
    const options = {
      pinataMetadata: {
        name: 'Register_music',
        keyvalues: {
          customKey: 'customValue',
          customKey2: 'customValue2',
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    try {
      //주소 변동
      let readableStreamForFile = fs.createReadStream(result.path);
      const result2 = await pinata.pinFileToIPFS(readableStreamForFile, options);
      console.log('파일어드레스?', result2);
      //   const pinata_result = await pinata.pinFromFS('public/upload', options); //주소 고정
      //   console.log(pinata_result);
      console.log('됐다는 거니?');
    } catch (e) {
      console.log('에러났다.', e);
    }
  }
};

module.exports = { thumbnail };
