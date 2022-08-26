const User = require('../models/userModel');

exports.join = async (req, res) => {
  const { nickname, email, account } = req.body.userInfo;
  let result;
  const existedAcct = await User.find({
    account,
  });
  if (existedAcct.length === 0) {
    try {
      const newUser = await User.create({
        account,
        nickname,
        email,
      });
      result = { userInfo: newUser, isNew: 'true' };
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  } else {
    result = { userInfo: existedAcct[0], isNew: 'false' };
  }
  res.send(result);
};

exports.login = async (req, res) => {
  const { account } = req.body;
  try {
    const existedAcct = await User.find({
      account,
    });
    if (existedAcct.length === 0) throw new Error('no data');
    res.send({ user: existedAcct[0] });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.quit = async (req, res) => {};

exports.editUserInfo = async (req, res) => {};

exports.checkJoinForm = async (req, res) => {
  const { nickname } = req.body;
  try {
    const existedNick = await User.find({
      nickname,
    });
    if (existedNick.length > 0) {
      res.send({ isOkToUse: false });
    } else {
      res.send({ isOkToUse: true });
    }
  } catch (err) {
    console.log(err);
  }
};
