const express=require('express');
const productRouter=express.Router()
const produtCtrl=require('../controllers/productCtrl')


productRouter.post('/',produtCtrl.addProd)








module.exports=productRouter;
