const { array } = require('../middlewares/multerConfig')
const product=require('../models/product')

let errors={name:'',description:'',category:'',price:''}


const handleError=(err)=>
{
   if(err.message.includes("Product validation failed"))
   Object.values(err.errors).forEach((error)=>
   {
    errors[error.properties.path]=error.properties.message
   })

   return errors
}


exports.addProd=(req,res,next)=>
{
   
    let img=[]

    if (req.files){
       req.files.forEach(el=> {
            img.push(el.path)            
        });
       
    }
    
  
    req.body.owner=req.user._id
    req.body.images=img
    product.create(req.body).then(doc=> {
      
        res.status(201).json({doc})
    }).catch(err=>  {console.log(err),res.status(401).json({err:handleError(err)})})


}


exports.getProd=(req,res)=>
{
    product.find({}).then((doc)=>doc.forEach((prod)=>{prod.rating=calculRating(prod.like.length,prod.dislike.length)
        prod.save().then(rslt=>console.log(rslt)).catch(err=>res.send(err))}), product.find({}).then(prods=>res.status(201).json(prods)).catch(err=>res.status(403).send(err))
    .catch(err=>res.status(403).send(err)))
  
}

exports.like=async(req,res)=>
{
   
    let tmp
 try
 {
    let prod=await product.findById(req.params.prodID)

       if (prod)
       {
        if(prod.like.indexOf(req.user._id)>=0)
            return res.status(403).json({message:'already liked'})
       
        if(prod.dislike.indexOf(req.user._id)>=0) /*check if disliked then remove the dislike */
        {
            let index=prod.dislike.indexOf(req.user._id)

            tmp=prod.dislike[index]
            prod.dislike[index]= prod.dislike[prod.like.length-1]
            prod.dislike[prod.dislike.length-1]=tmp
            prod.dislike.pop()
        }

        prod.like.push(req.user._id)

        let produit = await prod.save()
        if (produit) return res.status(201).json(produit)
  
        

    }

   

}
    catch(err)
    {
        res.status(403).json({message:'product not found'})
    }
}


exports.dislike=async(req,res)=>
{
    let tmp
 try
 {
    let prod=await product.findById(req.params.prodID)

       if (prod)
       {
        if(prod.dislike.indexOf(req.user._id)>=0)
            return res.status(403).json({message:'already disliked'})
       
        if(prod.like.indexOf(req.user._id)>=0) /*check if liked then remove the like */
        {
            let index=prod.like.indexOf(req.user._id)

            tmp=prod.like[index]
            prod.like[index]= prod.like[prod.like.length-1]
            prod.like[prod.like.length-1]=tmp
            prod.like.pop()
        }

        prod.dislike.push(req.user._id)

        let produit = await prod.save()
        if (produit) return res.status(201).json(produit)

  
        

    }

 

}
   
catch(err)
{
    res.status(403).json({message:'product not found'})
}
}


calculRating=(nbLike,nbDislike)=>
{
    let rate=((nbLike/(nbLike+nbDislike))*100)/20
    let rating=Math.round(rate)
    return rating
}