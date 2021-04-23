const config=require('../config')
const jwt=require('jsonwebtoken')
const user=require('../models/user')

module.exports=async (req,res,next)=>
{

let token

/*(req.cookies.jwt) undifiened*/
if(req.cookies)
token=req.cookies.jwt
else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))


    token=req.headers.authorization.split(' ')[1]


else
return res.status(403).json({message:'you are not authenticated'})


try
{
   const tokenData=jwt.verify(token,config.secretKey)
   const currentUSer=await user.findById(tokenData.userId)
   req.user=currentUSer
   

   next()
}


catch(err)
{
    res.status(403).json({message:'you are not authenticated'})
}



}

