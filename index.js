const express = require('express');
const app = express();
const port = 3000;
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

mongoose.connect('mongodb+srv://inhalin:inhalin@node-react-boiler-plate.zn6la.mongodb.net/boilerplate?retryWrites=true&w=majority', {
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
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

