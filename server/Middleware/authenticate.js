const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt =require('jsonwebtoken');
const user = require('../Models/user')
const { Router } = require('react-router-dom');

const authenticate =async(req,res,next)=>{
    
    try{
        
        // console.log("I am sexy cookie "+req.cookies.jwtoken);
        const token= req.cookies.jwtoken;
        if(!token){
            
            throw new Error("user not found")
        }
        
        const verifyToken = jwt.verify(token,'THISISMYSECRETEKEYMYNAMEISNITISHPRATAP');

        const rootUser = await user.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!rootUser){
            throw new Error("user not found")

        }
        else{
            req.token = token;
            req.rootUser = rootUser;
            req.userId=rootUser._id
            res.send({rootUser})
        }
    }
    catch(e){
        res.status(400).send('Unautherized: No token provided');
        console.log(e);
    }
}
module.exports = authenticate;