const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
  },
  async (email, password, done) => {
    try{
      const exUser = await User.findOne({where : { email }});
      if(exUser){
        const result = await bcrypt.compare(password, exUser.password);
        if(result){ //비밀번호 일치
          done(null, exUser);
        } else{ //비밀번호 불일치
          const msg = encodeURIComponent('비밀번호가 일치하지 않습니다.');
          done(null, false, {message: msg});
        }
      } else{ // User가 없음
        const msg = encodeURIComponent('가입되지 않은 회원입니다.');
        done(null, false, {message : msg});
      }
    } catch(error){
        console.log(error);
        done(error);
    }
  } ));
};