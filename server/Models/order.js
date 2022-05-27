const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String,
        
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
    productName:{
        type:String,
    },
    price:{
        type:Number
    },
    orderOn:{
        type:Date,
        default:Date.now
    }
})

const order = mongoose.model('order',orderSchema);
module.exports = order