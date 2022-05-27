const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userschema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    
    email:{
        type:String,
        
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Invalid Email');
            }
        }
    },
    password:{
        type:String
    },
    phone:{
        type:Number,
        
       
    },
    address1:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        
       
    },
    state:{
        type:String,
        
    },
    landmark:{
        type:String,
        
    },
    userId:{
        type:String,
        default:Math.random()*100000+5,
        
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


userschema.methods.generateAuthToken=async function(){
    try{
        let token = jwt.sign({_id:this._id},"THISISMYSECRETEKEYMYNAMEISNITISHPRATAP")
    this.tokens= this.tokens.concat({token:token})
      await this.save();
      return token;
    }
    catch(e){
        console.log(e)
    }
}


const user = new mongoose.model('user',userschema);
module.exports = user;