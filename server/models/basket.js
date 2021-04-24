const mongoose=require('mongoose')
const Schema=mongoose.Schema;


const basketSchema=new Schema({
    items:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}],
    tottalPrice:{
        type:Number,
        default:0
    }
})

const basket=mongoose.model('Basket',basketSchema)


module.exports=basketSchema