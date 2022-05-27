import React,{useState,useEffect} from 'react'
import { Card, Button } from "react-bootstrap";
import imageUrl from '../Products/productImage'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'
import axios from "axios";


function Buy() {
const [item,setItem] = useState({})
const [quantaty,setQuantity] = useState(1)
const[user,handleUser] = useState('');
const [ordered,setordered]= useState({})
useEffect(()=>{
    const temp =  localStorage.getItem("purchageItem");

    setItem(JSON.parse(temp));
    callCartPage()
    console.log(JSON.parse(temp))

},[])
const handleCod = ()=>{

  // console.log("hi cod")
  const tempOrder = {
    productName:item.name,
    price:item.price,
    name:localStorage.getItem("name"),
    phone:localStorage.getItem("phone"),
    address:localStorage.getItem("address"),
    pincode:localStorage.getItem("pincode"),
    landmark:localStorage.getItem('landmark')
  }
  const res = axios.post('/order',tempOrder)
  window.alert("orderd")
  console.log(tempOrder)



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
      localStorage.setItem("phone",data.rootUser.phone)
      localStorage.setItem("address",data.rootUser.address1)
      localStorage.setItem("pincode",data.rootUser.pincode)
      localStorage.setItem("state",data.rootUser.state)
      localStorage.setItem("landmark",data.rootUser.landmark)


      

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




  return (
    <div>

        <div style={{margin:'1rem'}}>
        <Card style={{ width: "18rem",display:'flex'}}>
          <Card.Img variant="top" src={item.imageLink} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
             {item.description}
            </Card.Text>
            <Card.Text>
            <input type='number' placeholder='Quantity' onChange={(e)=>{
                setQuantity(e.target.value)
            }} value={quantaty} min={1} disabled></input>
            <br/>
             Price {(item.price)*quantaty}
            </Card.Text>
            <Button variant="primary" onClick={handleCod}>COD</Button>
           
           
          </Card.Body>
        </Card>
        
      </div>
      
    </div>
  )
}

export default Buy