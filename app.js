const express = require('express');
const path = require('path');
const morgan = require('morgan');
const template = require('./template');

const app = express();
app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //form data를 post로 받아올 때 필요한 모듈


const contents = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/contents', (req, res) => {
  res.send(contents);
});

app.post('/content', (req, res) => {
  console.log(req.body);
  const {title, text} = req.body;
  const id = Date.now();
  contents[id] = {title, text};
  res.redirect('/');
})

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`);
});
