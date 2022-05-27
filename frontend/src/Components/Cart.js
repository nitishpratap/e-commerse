import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import imageUrl from "../Products/productImage";
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'


const Cart = () => {
  const navigate = useNavigate();
  const [userId, handleUser] = useState("");
  const [cartData, handleCart] = useState([]);
  const [prod, setProd] = useState();
  const [deletedCart,setDeletedcart] = useState([])
  const callCartPage = async () => {
    try {
      const res = await fetch("/cart", {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data.rootUser._id);
      handleUser(data.rootUser._id);
      // console.log(data.rootUser)

      if (!res.status === 200) {
        navigate("/");
        const err = new Error(res.err);
        throw err;
      }
    } catch (error) {
      navigate("/signin");

      console.log(error);
    }
  };

  const getCart = async () => {
    try {
      let uid = userId;
      // console.log('I am the uid '+ uid )

      const res = await axios.get("/particularcart?userId=" + uid);
      console.log(res.data);
      handleCart(res.data);
      setDeletedcart(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };


  const deleteCartItem  =async(id)=>{
      console.log(id);


      const temp = cartData.filter((item)=>{
          return(item.productId!=id)
      })
      console.log(temp)

      handleCart(temp)
      const res =await axios.delete('/delete?productId='+id);
      console.log(res);
      window.alert('deleted')
  }
     



  
  useEffect(() => {
    console.log("userId is " + userId);
    getCart();
  }, [userId]);
  useEffect(() => {
    callCartPage();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "2rem",
        }}
      >
        {cartData.map((e) => {
          return (
            <div className="product" style={{ margin: "1rem" }}>
              <Card style={{ width: "18rem", display: "flex" }}>
                <Card.Img variant="top" src={e.image} />
                <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                  <Card.Title>₹{e.price}</Card.Title>
                  


            <div style={{display:'flex',justifyContent:'space-evenly'}}>
                  <Button variant="primary"><Link to='/buy'style={{textDecoration:'none',color:'white'}} onClick={(f)=>{
              console.log(e.price)
              localStorage.setItem("purchageItem",JSON.stringify(e));
              localStorage.getItem("purchageItem")
              console.log(localStorage)
            }} >Buy</Link></Button>
                  <Button variant="primary" onClick={()=>{
                      deleteCartItem(e.productId)
                  }}>Remove </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Cart;
