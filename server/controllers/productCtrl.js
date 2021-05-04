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

           await product.find().populate('owner','username avatar totalPnts')
           .then((docs)=>{
               res.status(201).json(docs)
             
           })
           .catch((err)=>console.log(err))
          
               
          
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
            throw new Error('already liked')
       
        if(prod.dislike.indexOf(req.user._id)>=0) /*check if disliked then remove the dislike */
        {
            let index=prod.dislike.indexOf(req.user._id)
            prod.dislike.splice(index,1)
        }

        prod.like.push(req.user._id)

         await prod.save()

         return res.status(200).json({message:'produit liked'})
     
  
        

    }

    throw new Error('product not found')

   

}
    catch(err)
    {
        res.status(403).json(err.message)
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

        throw new Error('already disliked')
       
        if(prod.like.indexOf(req.user._id)>=0) /*check if liked then remove the like */
        {
            let index=prod.like.indexOf(req.user._id)

            prod.like.splice(index,1)
        }

        prod.dislike.push(req.user._id)

      await prod.save()

      return res.status(200).json({message:'produit disliked'})
    
    
    }

     throw new Error('product not found')

 
}
   
catch(err)
{
    res.status(403).json(err.message)
}


}


