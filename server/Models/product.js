const mongoose = require('mongoose');
const validator = require('validator');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    category:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0,
        max:5,
        min:0
    },
    sellerId:{
        type:String,
        required:true
    },
    imageLink:{
        type:String,
        
    },
    description:{
        type:String,
        minlength:5,
        required:true
    }

})
const product =  new mongoose.model('product',productSchema);
module.exports = product;