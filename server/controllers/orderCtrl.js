const user=require('../models/user')
const Order=require('../models/order')
const nodemailer=require('../middlewares/nodemailer')




exports.checkOrder=(req,res)=>
{
 
    let cart=req.cookies.cart
    if(!cart)
    return res.status(403).json({message:'your cart is empty'})

    
  






    let order=new Order({customer:req.user._id,cart:cart,customerEmail:req.user.email})
    order.save().then(ord=>  
        {
              let mailOptions = {
            from: 'ghassenbriki23@gmail.com',
            to:ord.customerEmail ,
            subject: 'Sending your order details',
            html:  ['<div>',

            '<b>Hello dear customer \n',
            'Thanks for your order: ',
            'Total Price : '+cart.totalPrice+'\n',
            'Total purchases : '+cart.totalProd+'\n',
      
        
         '<div>' ].join(' ')

           };
            
           
         nodemailer.transporter.sendMail (mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
          });




    
          res.cookie('cart','deleteCart',{maxAge:1}).status(200).json({message:' Thanks your Order has been added'})
        
        
        }).catch(err=>res.send(err.message))
        

  

}