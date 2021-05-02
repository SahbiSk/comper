const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const basketSchema=new Schema({

    cart:{type:Object,required :true},
    customer:{type:mongoose.Types.ObjectId,ref:'User'},
    email:{type:String,requried:true}


                            })


const basket=mongoose.model('Basket',basketSchema)


module.exports=basketSchema