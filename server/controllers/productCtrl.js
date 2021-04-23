const product=require('../models/product')



exports.addProd=(req,res,next)=>
{
    product.create(req.body).then(doc=> {
        
        res.status(201).json({doc:doc})
    }).catch(err=>  res.status(401).json({err:err}))


}

