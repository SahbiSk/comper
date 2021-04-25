const user=require('../models/user')
const prod=require('../models/product')


exports.addFavorite=(req,res)=>
{


  prod.findById(req.params.productID).then(p=>
    {

        if(p)
    {
     
       user.findById(req.user._id)
       .then(usr=>
        {   
            
            if (usr)
            
            {
               
                if (usr.wishlist.indexOf(p._id)==-1 )
           {
                usr.wishlist.push(p._id)

                usr.save().then((saved)=>res.status(201).json(saved)).catch(err=>res.status(403).json({err}))
           }
                else

                return res.status(403).json({message:'the product is already in your favourites'})
        
            
                
            }

        }).catch(err=>res.status(404).json({err:err}))
    }

    }).catch(err=>res.status(404).json({message:'product not found'}))
       
    
     }





exports.getFavourite=(req,res)=>
{
    user.findById(req.user._id).then((usr)=>{
        if(usr)
        {
            if(usr.wishlist.length==0)
            return res.status(403).json({message:'your wishlist is Empty'})
            usr.populate('wishlist',(err,rslt)=>{
               res.status(200).json({wishlist:rslt.wishlist})
            })

        }
    }).catch(err=>res.status(403).json({message:'invalid user'}))
}



exports.deleteOne=(req,res)=>
{

    prod.findById(req.params.productID).then(p=>{
        if (p!=null)
 
       {
 
        user.findById(req.user._id)
        .then(usr=>
         {   
             
             if (usr)
             
             {
                
                 if (usr.wishlist.indexOf(p._id)==-1 )
            
                 return res.status(401).json({message:'cannot be deleted ! the product: '+p.name+' with ID:'+p._id+' is not in your wishlist'})
            
                 else
                {
                    let index=usr.wishlist.indexOf(p._id)
                    let tmp

                if    (index==usr.wishlist.length-1)

                        usr.wishlist.pop()
                else
                {
                    tmp=usr.wishlist[index]
                    usr.wishlist[index]= usr.wishlist[usr.wishlist.length-1]
                    usr.wishlist[usr.wishlist.length-1]=tmp
                    usr.wishlist.pop()
                }
             
                 usr.save().then((saved)=>res.status(201).json(saved)).catch(err=>res.status(403).json({err}))

                }
         
             
                 
             }
 
         }).catch(err=>res.status(404).json({err:err}))
 
    
        }
     
     
         }).catch(err=>res.status(404).json({message:'product not found'}))
 
 
 }
 
 
 exports.deleteAll=(req,res)=>
 {
    user.findById(req.user._id)
    .then(usr=>
     {   
         
         if (usr)
         
         {
            
             if (usr.wishlist.length==0 )
        
             return res.status(401).json({message:'your wishit is Empty'})
        
             else
            {
           
           for(i=usr.wishlist.length;i>=0;i--)
           {
                usr.wishlist.pop()
           }
            console.log(usr.wishlist)
             usr.save().then((saved)=>res.status(201).json(saved)).catch(err=>res.status(403).json({err}))

            }
     
         
             
         }

     }).catch(err=>res.status(404).json({err:err}))


 }