const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require('./models/User');

/**
 * 'bodyParser' is deprecated.ts(6385)
 * Express version less than 4.16.0
 * ---------------------------------
 * const bodyParser = require('body-parser');
 * 
 * app.use(bodyParser.urlencoded({ extended: true }));
 * app.use(bodyParser.json());
 * 
 * Express v4.16.0 and higher
 */
// application/x-www-form-urlencoded 타입 분석
app.use(express.urlencoded({ extended: true }));

// application/json 타입 분석
app.use(express.json());

// mongoose로 어플리케이션과 mongoDB 연결
const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => { console.log('MongoDB Connected...') })
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! Nice to see you!')
});

app.post('/register', (req, res) => {
  // 화원가입에 필요한 client 정보를 가져와 DB에 넣어주기
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err });

    return res.status(200).json({ success: true, userInfo });
  });
});

app.post('/login', (req, res) => {
  // 요청된 이메일 DB에서 찾기
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "입력하신 이메일에 해당하는 유저가 없습니다."
      });
    }

    // 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다."
        });
      }
    });
    
    // token 생성
    user.generateToken((err, user) => {
      if(err) return res.status(400).send(err);

      // token을 cookie에 저장
      res.cookie("x_auth", user.token)
      .status(200)
      .json({
        loginSuccess: true,
        userId: user._id
      });
    });
  });
});

app.listen(port, () => {
  console.log(`node-react-boilerplate listening at http://localhost:${port}`)
});

