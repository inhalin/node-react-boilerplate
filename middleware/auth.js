const {User} = require('../models/User');

// 인증 처리
let auth = (req, res, next) => {
  // 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookie.x_auth;

  // 토큰 복호화 후 유저 찾기
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if( ! user) return res.json({ isAuth: false, erre: true});

    req.token = token;
    req.user = user;

    next();
  });

  // 유저가 존재하면 인증 ok

  // 유저가 없으면 인증x
};

module.exports = {auth};