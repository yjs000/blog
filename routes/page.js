const express = require('express');

const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const { isNotLoggedIn } = require('./middlewares');


router.use((req,res,next) => {
  res.locals.user = req.user; //템플릿에서 사용할 수 있음
  if(req.user){
    if(req.user.email == process.env.ADMIT_EMAIL){
      res.locals.isAdmit = true;
      console.log('admit');
    } else{
      res.locals.isAdmit = false;
    }
    console.log(req.user.nick, req.user.id);
  } else {
    console.log('no user');
  }
  next();
})

router.get('/', async (req, res, next) => {
  // 홈화면은 일기장 탭
  try{
    const posts = await Post.findAll({
      include: [
        {model:User,
        attributes:['id', 'nick']},
        {model:Comment,
        attributes:['commenter', 'comment', 'PostId']},
      ],
      order: [['createdAt', 'DESC']],
    });

    const comments = await Comment.findAll({
      include : {
        model: User,
        attributes : ['nick']
      }
    });

    // console.log(comments);
    console.log(posts);

    res.render('main', {posts : posts, comments: comments});
  }catch(err){
    console.log(err);
    next(err);
  }
});



router.get('/join', isNotLoggedIn, (req, res, next) => {
  try{
    res.render('join', { title: "회원가입" });
  }catch(err){
    console.log(err);
    next(err);
  }  
});

router.get('/login',(req,res) =>{
  res.render('login', {title : '로그인'});
});

router.get('/postWrite', (req, res) =>{
  res.render('post', {title: '글쓰기'});
});

router.get('/postEdit/:postID', async (req, res) => {
  const postID = req.params.postID;
  const post = await Post.findOne({
    where:{ id: postID }
  });
  console.log(post);
  res.render('put', {title : '글 수정하기', target: post});
});

module.exports = router;