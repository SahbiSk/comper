const user=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const config=require('../config')

let errors={email:'',password:'',username:''}


const handleError=(err)=>
{
   if(err.message.includes("User validation failed"))
   //console.log(err.errors)
    Object.values(err.errors).forEach((error)=>
   {
    errors[error.properties.path]=error.properties.message
   })

   return errors
}






exports.signUp=(req,res,next)=>

{
 

  user.findOne({email: req.body.email}).exec()
  
  .then(doc=>{
    if(doc) return res.status(401).json({msg: "email already exist"});

   email=req.body.email
    username=req.body.username
   password=req.body.password
   let avatar=''
  if(req.file)
   avatar=req.file.path
  

        
        const usr = new user({
          email,
          username,
          password,
          avatar
        })

        usr.save()
        .then(rslt=>{
             // generating jwt and store it in cookie
      const token=jwt.sign({id:rslt._id,},config.secretKey,{ expiresIn: '24h' }) // in s
      
     /*res.cookie('jwt',token,{httpOnly:true,maxAge: 360000})*/
       res.status(200).json({userId:rslt._id,token:token})

              })

        .catch(err=> res.status(400).json({errors:handleError(err)}))
         
      

  }).catch(err=>{ res.status(400).json({err: err})})



}
              

exports.signIn=(req,res,next)=>



{

  user.findOne({email:req.body.email}).exec().then((user)=>{
    if(user==null)
    return res.status(404).json({err:'user does not exisits !'})

    bcrypt.compare(req.body.password,user.password).then((valid)=>
    {
      if (!valid) //valid boolean
      return res.status(401).json({error:'invalid password'})
      
      // generating jwt and store it in cookie
      const token=jwt.sign({userId:user._id,},config.secretKey,{ expiresIn: '24h' }) // in s
      
      //res.cookie('jwt',token,{httpOnly:true,maxAge: 360000}) // in ms
     
      res.status(200).json({userId:user._id,token:token})


      
    }).catch(err=>{console.log(err),res.status(401).json({err:err})})



  }).catch(err=>res.status(401).json({err:err}))
  

  


}    

    
exports.ranking=async (req,res)=>{
try
{
  let ranking =await user.find()
      if (ranking)
     ranking.sort((a,b)=>
      {
    return b.totalPnts - a.totalPnts

     })
     return res.status(200).json(ranking)
   
}

  catch(err)
  {
    res.status(403).json(err.message)
  }



}
                      
   
  