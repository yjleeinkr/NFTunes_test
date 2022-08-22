const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  account: { type: String, required: true },
  nickName: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: false },
});

// 스키마 등록
const User = mongoose.model('User', userSchema);

module.exports = User;
