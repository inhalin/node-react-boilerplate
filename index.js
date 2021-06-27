const express = require('express');
const app = express();
const port = 3000;

// mongoose로 어플리케이션과 mongoDB 연결
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://inhalin:inhalin@node-react-boiler-plate.zn6la.mongodb.net/boilerplate?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {console.log('MongoDB Connected...')})
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

