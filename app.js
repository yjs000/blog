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

// const gallery = (req,res) => res.render('gallery');
// const index = (req, res) => res.render('index');

app.get('/', (req, res) => {
  res.render('index', {menu:'diary'});
});

app.get('/gallery', (req, res) => {
  res.render('index', {menu:'gallery'});
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

app.put('/content/:id', (req, res) => {
  const{title, text} = req.body;
  contents[req.params.id] = {title, text};
  res.end();
});

app.delete('/content/:id', (req, res) => {
  delete contents[req.params.id];
  res.end();
})

app.get('/textForm', (req, res) => {
  res.sendFile(path.join(__dirname, `./public/text${req.query.type}Form.html`));
});

app.get('/edit', (req, res) => {
  res.send('edit');
})

app.get('/photoForm', (rea, res) => {
  res.sendFile(path.join(__dirname,'./public/photoForm.html'))
})

// app.get('/form/edit' , (req, res) => {
//   res.sendFile(path.join(__dirname, './public/addForm.html'));
// })

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`);
});
