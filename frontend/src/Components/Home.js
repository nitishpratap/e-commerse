import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import arr from "../Products/Items";
import imageUrl from '../Products/productImage'
import axios from "axios";
import { useState } from "react";
import Buy from "./Buy";
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'
import Slider from "./Slider";


function Home() {
  // console.log(arr);
  const [finalProductArr,handleProduct] = useState([])
  const [cartData,setcart] = useState({userId:'',productId:'',noOfItems:0,price:0,image:'',name:''})
  const [userId,handleUser] = useState('')

  
  const allHandler = async(e)=>{
    
    console.log(e.target.value)
    try {
      const res = await axios.get(`/${e.target.value}`)
    const productList = res.data
    console.log(productList[0].name);
    handleProduct(productList)
    
      
    } catch (error) {
      
    }
  }


  const electHandler = async(e)=>{
    
    // console.log(e.target.value)
    try {
      const res = await axios.get(`/${e.target.value}`)
    const productList = res.data
    console.log(productList[0].name);
    handleProduct(productList)
    
      
    } catch (error) {
      
    }
  }


  const assoceriesHandler = async(e)=>{
    
    // console.log(e.target.value)
    try {
      const res = await axios.get(`/${e.target.value}`)
    const productList = res.data
    console.log(productList[0].name);
    handleProduct(productList)
    
      
    } catch (error) {
      
    }
  }

  const bookHandler = async(e)=>{
    
    console.log(e.target.value)
    try {
      const res = await axios.get(`/${e.target.value}`)
    const productList = res.data
    console.log(productList[0].name);
    handleProduct(productList)
    
      
    } catch (error) {
      
    }
  }

  const clothHandler = async(e)=>{
    
    console.log(e.target.value)
    try {
      const res = await axios.get(`/${e.target.value}`)
    const productList = res.data
    console.log(productList[0].name);
    handleProduct(productList)
    
      
    } catch (error) {
      
    }
  }  


  const getAllProducts = async()=>{
    try {
      // const res = await fetch('/get',{
      //   method:'GET',
      //   headers:{
      //     'Content-Type':'application/json'
      // }
        
        
       
    // });
    const res = await axios.get('/get')
    const productList = res.data
    console.log(productList[0].name);
    handleProduct(productList)
     

    } catch (error) {
      console.log(error)
    }
  }

  const cartHandler =(e)=>{
    
    // console.log(e)
    let demoCart = {
      userId:userId,
      productId:e._id,
      noOfItems:1,
      price:e.price,
      image:e.imageLink,
      name:e.name

    }
    setcart({
      ...cartData,
      ...demoCart
    })
    postCart();


    // console.log(cartData)

  }


  const callCartPage = async ()=>{
    try {
        const res = await fetch('/cart',{
            method:'GET',
            headers:{
                accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        });
        const data = await res.json();
        // console.log(data.rootUser._id);
        handleUser(data.rootUser._id)
        console.log(data.rootUser)
        localStorage.setItem("name",data.rootUser.name);
        // console.log(localStorage)


        if(!res.status === 200){
            // navigate('/');
            const err = new Error(res.err);
            throw err;
        }
    } catch (error) {
        // navigate('/signin');

        console.log(error)           
    }
}

const postCart = async()=>{
  try{
    let res  =await axios.post('/cart',cartData);
  // console.log(res);
  console.log('hello')
  window.alert("Added to cart")
  }catch(err){
    console.log(err)
  }
}



  useEffect(()=>{
     getAllProducts();
     callCartPage()
    // console.log(finalProductArr);
// const a = '../Products/productImage/phone1.PNG'



  },[])
  useEffect(()=>{
    console.log(cartData)
    // console.log('I am called')

  },[cartData])
 const buyHandler= ()=>{
   <Router>
      <Link to='/buy'></Link>
   <Routes>
  <Route exact path="/buy" element={<Buy/>}/>
  </Routes>
  </Router>
  console.log("hey i am clicked")

   
 }




  return (
    <>
    <Slider/>
    <div style={{display:'flex',margin:'1rem', justifyContent:'space-evenly', color:'blue'}}>
    <h4><input type='checkbox' value='get' onClick={allHandler}/>All</h4>
    <h4><input type='checkbox' value='electronics' onClick={electHandler}/>Electronics</h4>
   <h4> <input type='checkbox' value='book' onClick={bookHandler}/>Book</h4>
    <h4> <input type='checkbox' value='clothing' onClick={clothHandler}/>Clothes</h4>
   <h4> <input type='checkbox' value='assesories' onClick={assoceriesHandler}/>Assoceries</h4>
    </div>



     <div  style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',padding:'2rem'}}>
      {finalProductArr.map((e) => {
        return(

       

        <div className="product" style={{margin:'1rem'}}>
        <Card style={{ width: "18rem",display:'flex'}}>
          <Card.Img variant="top" src={e.imageLink} />
          <Card.Body>
            <Card.Title>{e.name}</Card.Title>
            <Card.Text>
             {e.description}
            </Card.Text>
            <Card.Text>
             Price {e.price}
            </Card.Text>
            <div style={{display:'flex',justifyContent:'space-evenly'}}>
            <Button variant="primary"><Link to='/buy'style={{textDecoration:'none',color:'white'}} onClick={(f)=>{
              console.log(e.price)
              localStorage.setItem("purchageItem",JSON.stringify(e));
              localStorage.getItem("purchageItem")
              console.log(localStorage)
            }} >Buy</Link></Button>
            
            <Button variant="primary" onClick={()=>{cartHandler(e)}} >Add to cart</Button>
            </div>
          </Card.Body>
        </Card>
        
      </div>
      

        )


      })}
      </div>

    </>
  );
}
export default Home;
