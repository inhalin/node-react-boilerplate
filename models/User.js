const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

// user 모델 저장 전에 실행할 메서드 정의
userSchema.pre('save', function(next) {
  let user = this; 

  if(user.isModified('password')) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err);
      
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// schema를 모델로 감싸주기
const User = mongoose.model('User', userSchema);

// 만들어진 user 모델을 다른 곳에서 사용할 수 있도록 export 해주기
module.exports = { User };
