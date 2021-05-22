var comments = require("../models/comment");
var cmntctrl = {};

exports.checkCommentsOwnerShip = function (req, res, next) {
  if (req.isAuthenticated()) {
    comments.findById(req.params.comment_id, function (err, found) {
      if (err) {
        req.flash("error", "comment not found");
        res.redirect("back");
      } else {
        // if user owe this post
        if (found.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "you need to be logged in to do that");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "Permission denied");
    res.redirect("back");
  }
};

exports.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login first!");
  res.redirect("/login");
};

exports.like=async(req,res)=>
{
   
    
 try
 {
    let cmnt=await comments.findById(req.params.comment_id)

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
    let cmnt=await comments.findById(req.params.comment_id)

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