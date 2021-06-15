const passport = require('passport');
const User = require('../models/user');
const local = require('./localStrategy');

module.exports = () => {
  passport.serializeUser((user, done) => { // req.session에 user 데이터 저장
    console.log('__serializeUser()');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => { // db에서 user정보 가져와서 req.user에 저장. 서버 요청마다 호출
    console.log('__deserializeUser()');
    User.findOne({
      where: {id}
    })
    .then(user => done(null, user))
    .catch(err => done(err));
  });

  local();
}