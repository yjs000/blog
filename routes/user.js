const express = require('express');

const router = express.Router();
const path = require('path');

const contents = {};
let currentkey;

router.use(express.static(path.join(__dirname, '../public')));

router.get('/', (req, res) => {
  // 로그인을 한 경우 홈화면
  const admit = Boolean(req.cookies.admit);
  res.render('index', {menu:'diary', isAuthenticated:admit}); 
});

router.get('/contents', (req, res) => {
  res.send(contents);
});

router.post('/content', (req, res) => {
  console.log(req.body);
  const {title, text} = req.body;
  const id = Date.now();
  contents[id] = {title, text};
  res.end();
});

//content 수정
router.put('/content/:id', (req, res) => {
  const{title, text} = req.body;
  contents[req.params.id] = {title, text};
  res.end();
});

router.delete('/content/:id', (req, res) => {
  delete contents[req.params.id];
  res.end();
})

// 글 create하거나 edit하는 form을 얻음
router.get('/textForm', (req, res) => {
  res.sendFile(path.join(__dirname, `../public/text${req.query.type}Form.html`));
});

// 글을 edit하기 위해 key를 얻기 위해 필요
// currentkey에 key를 post
router.post('/currentkey/:key', (req, res) => {
  currentkey = req.params.key;
  res.end();
})

router.get('/currentkey', (req, res) => {
  res.send(currentkey);
})




module.exports = router;