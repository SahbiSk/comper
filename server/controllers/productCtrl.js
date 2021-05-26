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

    res.cookie("cart", '', { httpOnly: true, maxAge: 86400000 }); //cart lasts one day
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {

     //logged user
    token=req.headers.authorization.split(" ")[1]
   
  try
   {
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

else //visitor or user's wishlist is empty
  
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


exports.commentProd=(req,res)=>
{
    product.findById(req.params.prodID)
    .then((prod)=>{
        if(prod)
        {   
            if(!req.body.comment)
            throw (new Error('comment field is empty'))
            req.body.author = req.user._id;
            prod.comments.push(req.body);
            prod.save()
            .then(()=>
                
                        res.status(200).json({message:'comment added succefully !'})    
                    
                        
                
            ).catch(err=>res.status(404).json(err.message));
           
        }
        else{
            err = new Error('product '+ req.params.prodID + ' not found.');
            throw(err)
        }
    })
    .catch((err)=>res.status(404).json(err.message));

}


exports.updateComment=async (req,res)=>
{
    try
    {

         let prod=await product.findById(req.params.prodID)
        
        if( prod && prod.comments.id(req.params.commentID))
        {
            let id1=req.user._id.toString()
            let id2=prod.comments.id(req.params.commentID).author.toString()
         
            if( id1==id2 && req.body.comment )
             {
               
                prod.comments.id(req.params.commentID).comment=req.body.comment
                await prod.save()
                
                 return res.status(200).json({'message':'comment updated'})
                
             }
             
             

             throw(new Error('you are not allowed'))
        }
        

         throw (new Error('product or comment not found')) 

        



    }


    catch(err)

    {
        res.status(403).json(err.message)
    }
}

exports.deletComment=(req,res)=>
{
    try
    {

         let prod=await product.findById(req.params.prodID)
        
        if( prod && prod.comments.id(req.params.commentID))
        {
            let id1=req.user._id.toString()
            let id2=prod.comments.id(req.params.commentID).author.toString()
         
            if( id1==id2 && req.body.comment )
             {
               
                prod.comments.id(req.params.commentID).remove()
                await prod.save()
                
                 return res.status(200).json({message:'comment deleted'})
                
             }
             
             

             throw(new Error('you are not allowed'))
        }
        

         throw (new Error('product or comment not found')) 

        



    }


    catch(err)

    {
        res.status(403).json(err.message)
    }
}


exports.commentLike=(req,res)=>
{

    try
    {
       let prod=await product.findById(req.params.prodID)
   
          if (prod && prod.comments.id(req.params.commentID))
          {
           if(prod.comments.id(req.params.commentID).like.indexOf(req.user._id)>=0) //if liked remove like
              {
                let index=prod.comments.id(req.params.commentID).like.indexOf(req.user._id)
                prod.comments.id(req.params.commentID).like.splice(index,1)
              }
          
           if(prod.comments.id(req.params.commentID).dislike.indexOf(req.user._id)>=0) //remove dislike and like
           {
               let index=prod.comments.id(req.params.commentID).dislike.indexOf(req.user._id)
               prod.prod.comments.id(req.params.commentID).dislike.splice(index,1)
               prod.comments.id(req.params.commentID).like.push(req.user._id)
           }
   
           
   
            await prod.save()
   
            return res.status(200).json({message:'succes'})
        
     
           
   
       }
   
       throw new Error('product not found')
   
      
   
   }
       catch(err)
       {
           res.status(403).json(err.message)
       }
   }
   
exports.commentDislike=(req,res)=>
{

    try
    {
       let prod=await product.findById(req.params.prodID)
   
          if (prod && prod.comments.id(req.params.commentID))
          {
           if(prod.comments.id(req.params.commentID).dislike.indexOf(req.user._id)>=0) //if disliked remove dislike
              {
                let index=prod.comments.id(req.params.commentID).dislike.indexOf(req.user._id)
                prod.comments.id(req.params.commentID).dislike.splice(index,1)
              }
          
           if(prod.comments.id(req.params.commentID).like.indexOf(req.user._id)>=0) //remove like and dislike
           {
               let index=prod.comments.id(req.params.commentID).like.indexOf(req.user._id)
               prod.prod.comments.id(req.params.commentID).like.splice(index,1)
               prod.comments.id(req.params.commentID).dislike.push(req.user._id)
           }
   
           
   
            await prod.save()
   
            return res.status(200).json({message:'succes'})
        
     
           
   
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