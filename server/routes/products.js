const express=require('express');
const productRouter=express.Router()
const produtCtrl=require('../controllers/productCtrl')
const auth=require('../middlewares/authenticate')
const upload=require('../middlewares/multerConfig')



productRouter.post('/',auth,upload.array('productImages'),produtCtrl.addProd)
productRouter.post('/:prodID/likes',auth,produtCtrl.like)
productRouter.post('/:prodID/dislikes',auth,produtCtrl.dislike)


productRouter.post('/:prodID/comments',auth,produtCtrl.commentProd)
productRouter.put('/:prodID/comments/:commentID',auth,produtCtrl.updateComment)

productRouter.delete('/:prodID/comments/:commentID',auth,produtCtrl.deletComment)


productRouter.post('/:prodID/comments/:commentID',auth,produtCtrl.commentLike)
productRouter.post('/:prodID/comments/;commentID',auth,produtCtrl.commentDislike)



productRouter.get('/',produtCtrl.getProd)









module.exports=productRouter;
