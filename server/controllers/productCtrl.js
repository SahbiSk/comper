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



exports.getProd=async(req,res)=>
{

    try {

            let docs=await product.find()
            if (docs)
            
                docs.forEach(async(prod)=>
                {
                   
                    prod.comments.sort((a,b)=>
                     {
                        return Math.max(b.dislike.length,b.like.length) - Math.max(a.dislike.length,a.like.length)
                      })
                    prod.rating=calculRating(prod.like.length,prod.dislike.length)
                    let res=await prod.save()

                })
            
               console.log(docs)
            return res.status(201).json(docs)
        
    }
    
  catch(err)
    {
        res.status(403).send(err)
    }

}



exports.like=async(req,res)=>
{
   
    
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
            prod.dislike.splice(index,1)
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

            prod.like.splice(index,1)
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

    let rating

    if(nbLike===0 && nbDislike===0)
    rating=0
    else
    {
    let rate=((nbLike/(nbLike+nbDislike))*100)/20
    rating =Math.round(rate)
    }

    
    return rating
}