const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const orderSchema=new Schema({

    cart:{type:Object,required :true},
    customer:{type:mongoose.Types.ObjectId,ref:'User'},
    email:{type:String,required:true}


                            })


const orderSchema=mongoose.model('Basket',orderSchema)


module.exports=basketSchema