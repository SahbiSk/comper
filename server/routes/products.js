const express=require('express');
const productRouter=express.Router()
const produtCtrl=require('../controllers/productCtrl')
const auth=require('../middlewares/authenticate')
const upload=require('../middlewares/multerConfig')



productRouter.post('/',auth,upload.array('productImages'),produtCtrl.addProd)
productRouter.get('/',produtCtrl.getProd)









module.exports=productRouter;
