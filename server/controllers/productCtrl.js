const { array } = require('../middlewares/multerConfig')
const product=require('../models/product')
const user=require('./userCtrl')
const userModel=require('../models/user')
const auth=require('../middlewares/authenticate')
const config = require("../config");
const jwt=require('jsonwebtoken')

let errors={name:'',description:'',tag:'',price:'',category:''}


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
        console.log(req.user)
   
 

    if (req.file)
  
     req.body.image=req.file.path
       
    
    
  
    req.body.owner=req.user._id
   
    product.create(req.body).then(doc=> {
      
        res.status(201).json({doc})
    }).catch(err=>  {console.log(err),res.status(401).json({err:handleError(err)})})


}



exports.getProd=async(req,res)=>
{
    let token
    res.cookie("cart", cart, { httpOnly: true, maxAge: 86400000 }); //cart lasts one day
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {

     //logged user
    token=req.headers.authorization.split(" ")[1]
   
  try {
    const tokenData = jwt.verify(token, config.secretKey);
    let currentUSer = await userModel.findById(tokenData.userId).populate('wishlist');
  


   


  if(currentUSer && getCategory(currentUSer))
  
  {

  
   
 let req1= await product.find({tag:getCategory(currentUSer)}). sort({ rating: -1 }).lean()
 let req2= await product.find( { tag: { $ne: getCategory(currentUSer)} } ).sort({ rating: -1 }).lean()

 if( req2 && req1)
 {
 let querry=[...req2,...req1]
res.status(200).json(querry)
 }
    

  


}
  
}
  

  catch(err)
  {
      console.log(err)
  }
    

  }

else //visitor
  
{

  

  

           await product.find().populate('owner','username avatar totalPnts')
           .populate('comments.author','username avatar totalPnts')
           .then((docs)=>{
               res.status(201).json(docs)
             
           })
           .catch((err)=>console.log(err))
          
               
          

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



const getCategory=(user)=>
{
  let occLand=0
  let occSea=0
  if(user.wishlist.length>0)
  {
    user.wishlist.forEach(el=>{
      if(el.tag=='land')
      occLand++
      else
      occSea++
    })

  if(occLand>occSea)
  return 'land'
  else return 'sea'
  }
  return null
}