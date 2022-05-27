const mongoose = require('mongoose')
const validator = require('validator')
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Invalid Email');
            }
        }
    },
    password:{
        type:String,
        required:true,
    },

})

const admin = new mongoose.model('admin',adminSchema);
module.exports = admin; 