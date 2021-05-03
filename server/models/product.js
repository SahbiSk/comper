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
},
quantity:{
    type:Number,
    default:1
}
,
comments:[commentschema]



})


productSchema.pre('save',async function (next)


{
    this.comments.sort((a,b)=>
    {
       return Math.max(b.dislike.length,b.like.length) - Math.max(a.dislike.length,a.like.length)
     })
   this.rating=calculRating(this.like.length,this.dislike.length)
 

    next();


})

calculRating=(nbLike,nbDislike)=>
{

    let rating

    if(nbLike===0 && nbDislike===0)
    rating=0
    else
    {
    let rate=((nbLike/(nbLike+nbDislike))*100)/20
    rating =Math.round(rate)
    }

    
    return rating
}

const Products=mongoose.model('Product',productSchema);

module.exports=Products;
