const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const orderSchema=new Schema({

    cart:{type:Object,required :true},
    customerEmail:{type:String,required:true},
    date: { type: Date, default: new Date().toString().split(' ').splice(1,4).join(' ') }



                            })


const orders=mongoose.model('Order',orderSchema)


module.exports=orders