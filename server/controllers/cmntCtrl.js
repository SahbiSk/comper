const Product = require("../models/product");

exports.getAllComments=async (req,res) =>
{
  const prod = await Product.findById(req.params.prodID);
  res.send(prod.comments);
}

exports.addComment=async (req,res)=>
{
    Product.findById(req.params.prodID)
    .then((prod)=>{
        if(prod)
        {   
            if(!req.body.comment)
            throw (new Error('comment field is empty'))
            req.body.author = req.user._id;
            prod.comments.push(req.body);
            prod.save()
            .then(()=>
               res.status(200).json({message:'comment added succefully !'}))
            .catch(err=>res.status(404).json(err.message)); 
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
  
  exports.deleteComment=async (req,res)=>
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
  
  
  exports.commentLike=async (req,res)=>
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
     
  exports.commentDislike=async (req,res)=>
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