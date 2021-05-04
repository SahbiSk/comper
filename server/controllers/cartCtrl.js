const Cart=require('../models/cart')
const produit=require('../models/product')

exports.addToCart=async(req,res)=>
{
    
  

        let cart=new Cart(req.cookies.cart ? req.cookies.cart: {items:{},totalProd:0,totalPrice:0})
        console.log(cart)

  

        try {

    let p=await produit.findById(req.params.prodID)
    if (p)
    {
       

       let bool= cart.addToBasket(p,req.params.prodID)
       if (!bool)
       return res.status(403).json({message:'product is not available anymore'})
       
      
         p.save().then().catch(err=>console.log(err))

     
        res.cookie('cart',cart,{httpOnly:true,maxAge: 86400000}) //cart lasts one day


      
      
        console.log(cart)
        res.status(200).json({message:'added succefully in your cart'})
        

    }

        }
    catch(err)
    {
        res.status(403).json(err.message)
    }


}

exports.deleteONe=async(req,res)=>
{ 
 

    let cart=new Cart(req.cookies.cart ? req.cookies.cart: {items:{},totalProd:0,totalPrice:0})
    
   
    try {
let p=await produit.findById(req.params.prodID)
if (p)
{
   let Deleteprocess=cart.deleteFromBasket(req.params.prodID)
   if(!Deleteprocess)
   {
       return res.status(403).json({message:'product not available in Cart'})
   }

    
   p.quantity++
   p.save().then().catch(err=>console.log(err))

   console.log(cart)
   res.cookie('cart',cart,{httpOnly:true,maxAge: 86400000}) //cart lasts one day
    res.status(200).json({'message':'product removed succefully'})


}

    }
catch(err)
{
    res.status(403).json({err})
}
    
}