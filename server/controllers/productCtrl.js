const { array } = require('../middlewares/multerConfig')
const product=require('../models/product')

let errors={name:'',description:'',category:'',price:''}


const handleError=(err)=>
{
   if(err.message.includes("Product validation failed"))
   Object.values(err.errors).forEach((error)=>
   {
    errors[error.properties.path]=error.properties.message
   })

   return errors
}


exports.addProd=(req,res,next)=>
{
   
    let img=[]

    if (req.files){
       req.files.forEach(el=> {
            img.push(el.path)            
        });
       
    }
    
  
    req.body.owner=req.user._id
    req.body.images=img
    product.create(req.body).then(doc=> {
      
        res.status(201).json({doc})
    }).catch(err=>  {console.log(err),res.status(401).json({err:handleError(err)})})


}


exports.getProd=(req,res)=>
{
    product.find({}).then((doc)=> res.status(200).json(doc)).catch(err=>res.send(err))
}
