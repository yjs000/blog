const express = require('express');
const {isLoggedIn} = require('./middlewares');

const Comment = require('../models/comment');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  const {commenter, comment, postId} = req.body;
  try{
    const result = await Comment.create({
      comment : comment,
      commenter : commenter,
      PostId : postId
    });
    // console.log(result);
    res.redirect('/');
  }catch(err){
    console.log(err);
    next(err);
  }
});

module.exports = router;