const Cart=require('../models/cart')
const produit=require('../models/product')

exports.addToCart=async(req,res)=>
{

    let cart=new Cart(req.cookies.cart ? req.cookies.cart:{})
    console.log(cart)
    try {

    let p=await produit.findById(req.params.prodID)
    if (p)
    {

        cart.addToBasket(p,req.params.prodID)
        res.cookie('cart',cart,{httpOnly:true,maxAge: 86400000}) //cart lasts one day

    }

        }
    catch(err)
    {
        res.status(403).json(err)
    }


}

exports.deleteONe=(req,res)=>
{ 
 try {

    let cart=new Cart(req.cookies.cart ? req.cookies.cart: {})


let p=await produit.findById(req.params.prodID)
if (p)
{
   let Deleteprocess=cart.deleteFromBasket(req.params.prodID)
   if(!Deleteproces)
   {
       return res.status(403).json({'message':'product not available in Cart'})
   }

    req.cookies.cart=cart
    res.status(200).json({'message':'product removed succefully'})


}

    }
catch(err)
{
    res.status(403).json(err)
}
    
}