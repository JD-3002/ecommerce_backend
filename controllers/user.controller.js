const UserModel = require('../models/user.model')

const registerUserController = async(req, res)=>{
try{
    const {name, email , password} = req.body
   if(!name || !email || !password){
 return res.status(400).json({
    message:"provide email, name, password",
     error: true,
        success: false
 })
   }

   const user = await UserModel.findOne({email})
   
   if(user){
     return res.status(400).json({
    message:"User already Exist",
     error: true,
        success: false
 })
   }

   const payload = {
    name,
    email,
    password
   }

   const newUser = new UserModel(payload)
   const save = await newUser.save()

   return res.json({
    message:"User Registered Successfully",
    error:false,
    success:true,
    data:save
   })



}catch(error){
    return response.status(500).json({
        message:error.message || error,
        error: true,
        success: false
    })
}
}



module.exports = {registerUserController}