const express = require("express");
const router = express.Router();
const auth=require('../middlewares/authenticate');
const controller = require("../controllers/cmntCtrl");


//get all comments
router.get('/:prodID/comments',controller.getAllComments);
//get a comment
//router.get('/:prodID/comments/:commentID',controller.getComment);
//add comment
router.post('/:prodID/comments',auth,controller.addComment);
router.post('/:prodID/comments/:commentID/likes',auth,controller.like);
router.post('/:prodID/comments/:commentID/dislikes',auth,controller.dislike);
//update form
router.put("/:prodID/comments/:commentID",auth,controller.updateComment);
//delete comment
router.delete("/:prodID/comments/:commentID",auth,controller.deleteComment);

module.exports = router;