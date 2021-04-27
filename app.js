const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , 'pug');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false})); //body-parser
app.use(express.json()); //form data를 post로 받아올 때 필요한 모듈
app.use(cookieParser());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET, //쿠키 암호화한 암호
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name:'session-cookie'
}));

const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.get('/', (req, res) => {
  // 홈화면은 일기장 탭
  const admit = Boolean(req.cookies.admit);
  res.render('index', {menu:'diary', isAuthenticated:admit}); 
});

app.get('/gallery', (req, res) => {
  const admit = Boolean(req.cookies.admit);
  res.render('index', {menu:'gallery', isAuthenticated:admit});
});

app.get('/logout', (req, res) => {
  res.clearCookie('admit', true, {
    httpOnly: true
  });
  res.redirect('/');
});

app.get('/login',(req,res) =>{
  res.sendFile(path.join(__dirname,'public/login.html'));
});

app.post('/admit', (req, res) => {
  const {userID, password} = req.body;
  if(userID==process.env.USERID & password==process.env.PASSWORD){
    res.cookie('admit',true, {
      maxAge : 1000* 60 * 60,
      httpOnly: true
    });
    res.redirect('/user');
  } else{
    res.redirect('/login');
  }
});

app.get('/admit', (req, res) => {
  const admit = Boolean(req.cookies.admit);
  res.send(admit);
})


app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`);
});
