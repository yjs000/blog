const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

//회원가입
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body; // 입력된 정보를 받음
  const exUser = await User.findOne({ where: { email }});
  try{
    if(exUser){ //사용자가 이미 있으면 error=exist
      return res.redirect('/error?error=exist');
    }
    // exUSer가 아니면
    const hash = await bcrypt.hash(password, 12)//입력된 password암호화
    await User.create({
      email, nick, password:hash //입력된 정보로 User만듦
    });
    return res.redirect('/');
  } catch(err) {
    console.log(err);
    return next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    //local()에서 오류가 난 경우
    if(authError){
      console.log(authError);
      return next(authError);
    }
    //비밀번호에러, 가입되지 않은 사용자
    if(!user){
      return res.redirect(`/error?loginError=${info.message}`);
    }
    //오류 없는 경우
    return req.login(user, (loginError)=> { //로그인과정중 에러
      if(loginError){
        console.log(error(loginError));
        return next(loginError);
      }
      //로그인이 성공적으로 끝남
      return res.redirect('/');
    });
  }) (req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;