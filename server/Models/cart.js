const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    noOfItems :{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        default:0
    },
    image:{
        type:String
    },
    name:{
        type:String
    }
})

const cart = new mongoose.model('cart',cartSchema);
module.exports =cart;