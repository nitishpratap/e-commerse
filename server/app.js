const express = require('express');
const app = express();
require('./Database/connection')
const PORT = process.env.PORT || 8000
const user = require('./Models/user');
const product = require('./Models/product');
const admin =  require('./Models/admin');
const cart =require('./Models/cart');
const { append } = require('express/lib/response');
const req = require('express/lib/request');
const jwt = require('jsonwebtoken')
const authenticate = require('./Middleware/authenticate')
const cookieParser = require('cookie-parser');
const res = require('express/lib/response');
const { default: axios } = require('axios');
const order = require('./Models/order')




app.use(express.json());
app.use(cookieParser())

//creating a new user


const createUser = ()=>{
    app.post('/register',async(req,res)=>{
        try{
        const newUser = new user(req.body);
        const createdUser = await newUser.save();
        res.status(201);
        res.send(createdUser);
        }
        catch(e){
            res.status(400).send(e);
            console.log(req.body)
            console.log(e);
        }

    })
}
createUser();



// loging route
const userLogin =()=>{
   
    app.post('/signin',async(req,res)=>{
        
        try{
            let token;
           const {email,password} = req.body;
        //    console.log(password)
           if(!email|| !password){
               return res.status(400).json({error:'please fill data'})
           }
           const userEmail = await user.findOne({email:email})
        //    const userPass = await user.findOne({$and:[{email:email},{password:password}]})
           
           if(!userEmail){
            return res.status(400).json({error:'User Not Found'})

           }
           else if(userEmail.password!=password){
            return res.status(400).json({error:'Invalid Credinals'})
          
        
        }
        else{
            //generating token
             token = await userEmail.generateAuthToken();
            // console.log('token is '+token);
            res.cookie('jwtoken',token,{
                expires:new Date(Date.now()+2589000000),
                httpOnly:true
            });
            // console.log("cookies awesome is "+ req.cookies.jwtoken)
            // console.log(userEmail);
            
           res.json(userEmail);
           res.status(200);
        }

        }
        catch(e){
            console.log(e);
        }
    })
}


userLogin();




const createProduct = ()=>{
    app.post('/product',async(req,res)=>{
        try{
            const newProduct = new product(req.body);
            const createdProduct = await newProduct.save();
            res.status(201);
            res.send(createdProduct);
        }
        catch(e){
            console.log(e);
            res.status(400);
        }
    })
}
createProduct();

const createAdmin = ()=>{
    app.post('/admin',async(req,res)=>{
        try{
        const newAdmin = new admin(req.body);
        const createdAdmin = await newAdmin.save()
        res.status(201);
        res.send(createdAdmin);
        }
        catch(e){
            res.status(400);
            console.log(e);
        }
    })
}
createAdmin();

const createCart = ()=>{
    app.post('/cart',async(req,res)=>{
        try{
            const newCart = new cart(req.body);
            const createdCart = await newCart.save();
            res.status(201);
            res.send(createdCart);
        }catch(e){
            res.status(400);
            console.log(e);
        }
    })
}
createCart();

app.get('/cart',authenticate,(req,res)=>{
    
    
})

app.get('/particularcart',async(req,res)=>{
    try {
        const uId = req.query;
        // console.log(uId)
        const userCart = await cart.find({userId:uId.userId})
        res.send(userCart)
        res.status(200)
        // console.log(userCart);
    } catch (error) {
        res.status(400);
        console.log(error)
    }
})



const getProduct = ()=>{
    app.get('/get',async (req,res)=>{
       try {
        const prod = await product.find();
        res.send(prod);
        res.status(200)
        console.log(prod);

       } catch (error) {
           res.status(400);
           console.log(error)
       }

    })
}
getProduct();

const getProductByElectronics = ()=>{
    app.get('/electronics',async (req,res)=>{
       try {
        const prod = await product.find({category:'Electronics'});
        res.send(prod);
        res.status(200)
        console.log(prod);

       } catch (error) {
           res.status(400);
           console.log(error)
       }

    })
}
getProductByElectronics();
const getProductByClothing = ()=>{
    app.get('/clothing',async (req,res)=>{
       try {
        const prod = await product.find({category:'clothing'});
        res.send(prod);
        res.status(200)
        console.log(prod);

       } catch (error) {
           res.status(400);
           console.log(error)
       }

    })
}
getProductByClothing();


const getProductByAssesories = ()=>{
    app.get('/assesories',async (req,res)=>{
       try {
        const prod = await product.find({category:'assesories'});
        res.send(prod);
        res.status(200)
        console.log(prod);

       } catch (error) {
           res.status(400);
           console.log(error)
       }

    })
}
getProductByAssesories();



const getProductByBook = ()=>{
    app.get('/book',async (req,res)=>{
       try {
        const prod = await product.find({category:'books'});
        res.send(prod);
        res.status(200)
        console.log(prod);

       } catch (error) {
           res.status(400);
           console.log(error)
       }

    })
}
getProductByBook();

const getProductById = ()=>{
    
    app.get('/getbyid',async(req,res)=>{
        try {
        const uId = req.query;
        console.log(uId)
            const prod = await product.find({category:'book'})
            console.log(prod);
            res.send(prod)


        } catch (error) {
            res.status(400);
            console.log(error)
        }
    })
}
getProductById()

const deleteCartItem = ()=>{
    app.delete('/delete',async(req,res)=>{
        try {
            const prodId = req.query;
            console.log(prodId.productId)
            const deleteCart = await cart.deleteOne({productId:prodId.productId})
            res.send(deleteCart)
            console.log(deleteCart)
        } catch (error) {
            console.log(error);
            res.send(400);
        }
    })
}
deleteCartItem()

const postOder = ()=>{
    app.post('/order',async(req,res)=>{
        try {
            const newOrder = new order(req.body);

            const createOrder = await newOrder.save();
            res.status(201);
            res.send(createOrder)
        } catch (error) {
            res.status(400);
            res.send(error)
            console.log(error);
        }
    })

}
postOder();

const getOrder = ()=>{
    app.get('/order',async(req,res)=>{
        try {
            let ph = req.query.phone
        const result = await order.find({phone:ph})
        console.log(ph);
        res.send(result);
        res.status(200)
        } catch (error) {
            
        }
    })
}
getOrder()
app.listen(PORT,()=>{
    console.log(`Listinging at ${PORT}`);
})