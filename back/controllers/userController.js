const User = require('../models/userModel');

exports.join = async (req, res) => {
  const { nickname, email, account } = req.body;
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
      result = { user: newUser, isNew: true };
    } catch (err) {
      console.log(err);
    }
  } else {
    result = { user: existedAcct[0], isNew: false };
  }
  res.send(result);
};

exports.login = async (req, res) => {};
exports.quit = async (req, res) => {};
exports.editUserInfo = async (req, res) => {};
