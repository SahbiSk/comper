const Product = require("../models/product");

exports.getAllComments=async (req,res) =>
{
  const cmnt = await Product.comments.find();
  res.send(cmnt);
}

exports.getComment=async (req,res) =>
{
  const cmnt = await Product.comments.findById(req.params.commentID);
  
    if (!cmnt) return res.status(404).send('The comment with the given ID was not found.');
  
    res.send(cmnt);
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

         let prod=await Product.findById(req.params.prodID)
        
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

         let prod=await Product.findById(req.params.prodID)
        
        if( prod && prod.comments.id(req.params.commentID))
        {
            let id1=req.user._id.toString()
            let id2=prod.comments.id(req.params.commentID).author.toString()
         
            if( id1==id2 && req.body.comment )
             {
                await Product.findByIdAndRemove(req.params.commentID);
                await prod.save()
                return res.status(200).json({'message':'comment deleted'})
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

exports.like=async(req,res)=>
{
   
    
 try
 {
    let cmnt=await Product.findById(req.params.commentID)

       if (cmnt)
       {
        if(cmnt.like.indexOf(req.user._id)>=0)
            throw new Error('already liked')
       
        if(cmnt.dislike.indexOf(req.user._id)>=0) /*check if disliked then remove the dislike */
        {
            let index=cmnt.dislike.indexOf(req.user._id)
            cmnt.dislike.splice(index,1)
        }

        cmnt.like.push(req.user._id)

         await cmnt.save()

         return res.status(200).json({message:'comment liked'})
     
    }

    throw new Error('comment not found')

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
    let cmnt=await Product.findById(req.params.commentID)

       if (cmnt)
       {

        if(cmnt.dislike.indexOf(req.user._id)>=0)

        throw new Error('already disliked')
       
        if(cmnt.like.indexOf(req.user._id)>=0) /*check if liked then remove the like */
        {
            let index=cmnt.like.indexOf(req.user._id)

            cmnt.like.splice(index,1)
        }

        cmnt.dislike.push(req.user._id)

      await cmnt.save()

      return res.status(200).json({message:'comment disliked'})
    
    
    }

     throw new Error('comment not found')

 
}
   
catch(err)
{
    res.status(403).json(err.message)
}
}