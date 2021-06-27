const mongoose = require('mongoose');

// mongoose를 이용해서 schema 생성하기
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 공백 없애기
    unique: 1
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastName: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  Image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// schema를 모델로 감싸주기
const User = mongoose.model('User', userSchema);

// 만들어진 user 모델을 다른 곳에서 사용할 수 있도록 export 해주기
module.exports = { User };
