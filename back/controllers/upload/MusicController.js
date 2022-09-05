const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

// const uploadMusic = async (req, res) => {
//   const fileName = `${req.file.filename}`;
//   let result;
//   try {
//     const filePath = req.file == undefined ? '' : `public/upload/audio/${fileName}`;

//     const options = {
//       destination: fileName,
//     };

//     await storage.bucket(bucketName).upload(filePath, options);
//     result = {
//       status: true,
//       msg: `${fileName} has been uploaded on ${bucketName}`,
//     };
//     res.json(result);
//   } catch (err) {
//     console.log(err);
//     result = {
//       status: false,
//       msg: `error msg - ${err.msg}`,
//     };
//     res.json(result);
//   }
// };

const uploadMusic = async (req, res) => {
  const storage = new Storage({
    projectId: proess.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    },
  });
  const bucket = storage.bucket(process.env.BUCKET_NAME);
  const file = bucket.file(req.query.file);
  const options = {
    expires: Date.now() + 1 * 60 * 1000,
    fields: { "x-goog-meta-test": "data" },
  };

  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
};

module.exports = uploadMusic;
