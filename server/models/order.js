const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const user=require('./user')


const orderSchema=new Schema({
    customer:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
  },
    cart:{type:Object,required :true},
    customerEmail:{type:String,required:true},
    date: { type: Date, default: new Date().toString().split(' ').splice(1,4).join(' ') }



                            })


orderSchema.pre('save', function (next)
{
   
    
    Object.values(this.cart.items).forEach(element=> 
      {
          if(element.item.owner ==this.customer)
          return next(new Error('please delete your product '+element.item.name+' from cart'))

          user.findById(element.item.owner)
          .then  (user => 
            { 
             
              user.totalPnts+= element.price *10 

            user.save().then().catch(err=>console.log(err))
     
            })
          .catch(err=>console.log(err))
      })


   
    next()
   

})




const orders=mongoose.model('Order',orderSchema)


module.exports=orders