const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentschema=new Schema({

author:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},

comment:
{
    type:String,
    default:''
}
,
like:
{

    type:Number,
    default:0
}
,

dislike:
{
    type:Number,
    default:0

}
}

,

{
    timestamps:true
} );


const productSchema=new Schema({

owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
name:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},
rating:{
    type:Number,
    min: 1,
    max: 5,
    required: true
},


like:{

    type:Number,
    default:0
}
,

dislike:
{
    type:Number,
    default:0

},

images: 
{
    type: [String],  
    required:true
},
price:
{
 type:Number,
 required:true
},
quantity:
{
    type:Number,
    default:1
}
,
tag:
{
    type:String,
    default:''
}
,
comments:[commentschema]



})



const Products=mongoose.model('Product',productSchema);

module.exports=Products;
