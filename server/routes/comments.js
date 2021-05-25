const express = require("express");
const router = express.Router();
const auth=require('../middlewares/authenticate');
const controller = require("../controllers/cmntCtrl");


//get comments
router.get('/:prodID/comments',controller.getAllComments);
//add comment
router.post('/:prodID/comments',auth,controller.addComment);
router.post('/:prodID/comments/:commentID/likes',auth,controller.commentLike);
router.post('/:prodID/comments/:commentID/dislikes',auth,controller.commentDislike);
//update form
router.put("/:prodID/comments/:commentID",auth,controller.updateComment);
//delete comment
router.delete("/:prodID/comments/:commentID",auth,controller.deleteComment);

module.exports = router;