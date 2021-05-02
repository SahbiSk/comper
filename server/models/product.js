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
[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
,

dislike:
[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]

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
    min: 0,
    max: 5,

    
  
    
},


like:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
,

dislike:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
,


images: [String]
,
price:
{
 type:Number,
 required:true
},

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
