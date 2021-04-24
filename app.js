const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , 'pug');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //form data를 post로 받아올 때 필요한 모듈


const contents = {};
let currentkey;
// const gallery = (req,res) => res.render('gallery');
// const index = (req, res) => res.render('index');

app.get('/', (req, res) => {
  res.render('index', {menu:'diary'}); // 일기장 탭이 홈화면
});

app.get('/contents', (req, res) => {
  res.send(contents);
});

app.post('/content', (req, res) => {
  console.log(req.body);
  const {title, text} = req.body;
  const id = Date.now();
  contents[id] = {title, text};
  res.end();
});

//content 수정
app.put('/content/:id', (req, res) => {
  const{title, text} = req.body;
  contents[req.params.id] = {title, text};
  res.end();
});

app.delete('/content/:id', (req, res) => {
  delete contents[req.params.id];
  res.end();
})

// 글 create하거나 edit하는 form을 얻음
app.get('/textForm', (req, res) => {
    res.sendFile(path.join(__dirname, `./public/text${req.query.type}Form.html`));
});

// 글을 edit하기 위해 key를 얻기 위해 필요
// currentkey에 key를 post
app.post('/currentkey/:key', (req, res) => {
  currentkey = req.params.key;
  res.end();
})

app.get('/currentkey', (req, res) => {
  res.send(currentkey);
})

//사진첩 탭을 누르면 나오는 화면
app.get('/gallery', (req, res) => {
  res.render('index', {menu:'gallery'});
});

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`);
});
