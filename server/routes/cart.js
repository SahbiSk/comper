const express=require('express');
const CartRouter=express.Router()
const cartCtrl=require('../controllers/cartCtrl')


CartRouter.post('/addToCArt/:prodID',cartCtrl.addToCart)
CartRouter.delete('/deleteOne/:prodID',cartCtrl.deleteONe)


module.exports=CartRouter