const express=require('express');
const productRouter=express.Router()
const produtCtrl=require('../controllers/productCtrl')
const auth=require('../middlewares/authenticate')
const upload=require('../middlewares/multerConfig')



productRouter.post('/',upload.fields([
    { name: 'file1'},
    { name: 'file2' }
  ]),produtCtrl.addProd)
productRouter.post('/:prodID/likes',produtCtrl.like)
productRouter.post('/:prodID/dislikes',produtCtrl.dislike)


productRouter.get('/',produtCtrl.getProd)









module.exports=productRouter;