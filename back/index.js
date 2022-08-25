const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/index');
const mongodb = require('mongodb');

require('dotenv').config();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nftMarket';
const MONGODB_PW = process.env.MONGODB_PW;

const MongoClient = mongodb.MongoClient;
const mongoUrl = `mongodb+srv://team1:${MONGODB_PW}@nftmarket.skj99nw.mongodb.net/nftMarket?retryWrites=true&w=majority`;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

MongoClient.connect(mongoUrl)
  .then((client) => {
    console.log('mongo connected');
    console.log(client);
  })
  .then(
    app.listen(PORT, () => {
      console.log(`connected to mongoDB, server's running on ${PORT} 🚀`);
    }),
  )
  .catch((err) => console.log(err));
