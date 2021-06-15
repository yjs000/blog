const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const Post = require('../models/post');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

//upload 폴더 생성
try{
  fs.readdirSync('uploads');
} catch(error){
  console.log('uploads폴더가 없어 uploads폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'uploads/');
    },
    filename(req, file, cb){
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: {fileSize: 5* 1024* 1024}
});

// post 생성
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({url:`/img/${req.file.filename}`});
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async(req, res, next) => {
  try{
    console.log(`/post:${req.body.title}, ${req.body.content}, ${req.body.url}, ${req.user.id}`);
    const post = await Post.create({
      title : req.body.title,
      content : req.body.content,
      img : req.body.url,
      UserId : req.user.id
    });
    res.redirect('/');
  }catch(err){
    console.log(err);
    next(err);
  }
});

// post 수정
router.put('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({url:`/img/${req.file.filename}`});
});

router.put('/', isLoggedIn, upload2.none(), async(req, res, next) => {
  try{
    console.log(`/put:${req.body.title}, ${req.body.content}, ${req.body.url}, ${req.user.id}`);
    const post = await Post.update({
      title : req.body.title,
      content : req.body.content,
      img : req.body.url,
      userId : req.user.id
    }, {
      where : {id:req.body.postID}
    });
    res.end();
  }catch(err){
    console.log(err);
    next(err);
  }
});

//post 삭제
router.delete('/:postID', isLoggedIn, async (req, res, next) => {
  try{
    await Post.destroy({where: {id: req.params.postID}});
    res.end();
  }catch(err){
    console.log(err);
    next(err);
  }
});
module.exports = router;