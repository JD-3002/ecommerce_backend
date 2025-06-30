const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Provide Name"]
    },
    email:{
        type:String,
        required:[true,"Provide Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Provide Password"],
    },
    avatar:{
        type:String,
        default: ""
    },
    mobile:{
        type:Number,
        default: null
    },
    refresh_token:{
        type:String,
        default:""
    },
    verify_email:{
        type:Boolean,
        default: false
    },
    last_login_date:{
        type:Date,
        default:""
    },
    status:{
        type: String,
        enum:["Active","Inactive","Suspended"],
        default:"Active"
    },
    address_details: [
        {
            type:mongoose.Schema.ObjectId,
            ref:'address'
        }
    ],
     shopping_cart: [
        {
            type:mongoose.Schema.ObjectId,
            ref:'cartProduct'
        }
    ],
      orderHistory: [
        {
            type:mongoose.Schema.ObjectId,
            ref:'order'
        }
    ],
    forgot_password_otp:{
        type:String,
        default:null
    },
    forgot_password_expiry:{
        type:Date,
        default:""
    },
    role : {
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    },

},{timestamps:true})


UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,10)
    next();
      
})


UserSchema.methods.comparePassword = async function (inputpass){
    return await bcrypt.compare(inputpass,this.password);
}

const UserModel = mongoose.model("User",UserSchema)
module.exports = UserModel