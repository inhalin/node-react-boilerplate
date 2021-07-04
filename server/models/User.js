const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

// mongoose를 이용해서 schema 생성하기
const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true, // 공백 없애기
    unique: 1
  },
  password: {
    type: String,
    minlength: 5,
  },
  name: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 1
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
  const user = this; 

  if(user.isModified('password')) {
    /**
     * 비밀번호 암호화
     * 
     * auto-gen a salt and hash
     */
    bcrypt.hash(user.password, saltRounds, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next()
    });

    /**
     * generate a salt and hash on separate function calls
     * 
     */ 
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //   if(err) return next(err);

    //   bcrypt.hash(user.password, salt, function(err, hash) {
    //     if(err) return next(err);

    //     user.password = hash;
    //     next();
    //   });
    // });

  } else {
    next();
  }
});

// 암호화된 비밀번호와 입력한 비밀번호가 같은지 비교
userSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  });
}

userSchema.methods.generateToken = function(cb) {
  const user = this;

  // jsonwebtoken을 이용해 token 생성
  const token = jwt.sign(user._id.toHexString(), 'secretToken');

  user.token = token;

  user.save(function(err, user) {
    if (err) return cb(err);

    cb(null, user);
  })
}

// token 복호화 함수
userSchema.statics.findByToken = function(token, cb) {
  const user = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
    // user_id로 유저를 찾고 client cookie의 토큰과 db의 토큰이 일치하는지 확인
    user.findOne({
      "_id": decoded,
      "token": token,
    }, function(err, user) {
      if (err) return cb(error);
      cb(null, user);
    })
  });
}

// schema를 모델로 감싸주기
const User = mongoose.model('User', userSchema);

// 만들어진 user 모델을 다른 곳에서 사용할 수 있도록 export 해주기
module.exports = { User };
