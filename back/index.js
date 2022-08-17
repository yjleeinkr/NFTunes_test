const express = require('express');
const app = express();
const cors = require('cors');
const { sequelize } = require('./database/models/index');
const router = require('./routes/index');

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(4000, async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('db synced, server onload 4000 🚀');
  } catch (err) {
    console.log(err);
  }
});
