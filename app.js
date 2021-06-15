const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
// const { urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const passportConfig = require('./passport/index');
passportConfig();

const app = express();

app.set('port', 8000);
//template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , 'pug');

//db 연결
sequelize.sync({force : false})
.then(() => {
  console.log("데이터베이스 연결 성공");
})
.catch((err) => {
  console.log(err);
});

//import routers
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // /img이하 경로는 uploads에서 찾도록
//body-parser
app.use(express.urlencoded({extended: false})); 
app.use(express.json()); //form data를 post로 받아올 때 필요한 모듈
//session
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET, //쿠키 암호화한 암호
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name:'session-cookie'
}));
//passport
app.use(passport.initialize()); //req객체에 passport정보 저장
app.use(passport.session()); // req.session에 passport정보 저장, session유지될때까지 passport정보가 계속 남아있도록 하기 위함

//router
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);

//요청 경로가 없을 경우 오류처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//서버 오류 처리
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err:{};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${app.get('port')}`);
});
