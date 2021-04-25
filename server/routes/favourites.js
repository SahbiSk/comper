const express=require('express');
const favouriteRouter=express.Router()
const auth=require('../middlewares/authenticate')
const favCtrl=require('../controllers/favouritesCtrl')


favouriteRouter.post('/:productID',auth,favCtrl.addFavorite)
favouriteRouter.get('/',auth,favCtrl.getFavourite)
favouriteRouter.delete('/:productID',auth,favCtrl.deleteOne)
favouriteRouter.delete('/',auth,favCtrl.deleteAll)







module.exports=favouriteRouter