import axios from "axios";
import { Card, Button } from "react-bootstrap";
import React,{useState,useEffect} from 'react'
function Order() {


    const [order,setOrder] = useState([]);
    const getOder =async ()=>{

        const ord = await axios.get('/order?phone='+localStorage.getItem("phone"))
        setOrder(ord.data);
        console.log(ord) 
    }
    useEffect(()=>{
    getOder()        
    },[])
  return (
    <div>
        
        <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "2rem",
        }}
      >
        {order.map((e) => {
          return (
            <div className="product" style={{ margin: "1rem" ,}}>
              <Card style={{ width: "25rem", display: "flex" }}>
                {/* <Card.Img variant="top" src={imageUrl} /> */}
                <Card.Body style={{backgroundColor:'yellowgreen'}}>
                <Card.Title>{e.productName}</Card.Title>
                  <Card.Title>₹{e.price}</Card.Title>
                  
                  <Card style={{ width: "20rem", display: "flex" }}>
                {/* <Card.Img variant="top" src={imageUrl} /> */}
                <Card.Body style={{color:'yellowgreen'}}>
                <h1>order by-</h1>
                <Card.Title> {e.name}</Card.Title>
                <h1>Address-</h1>
                <Card.Title>{e.address}</Card.Title>
                <Card.Title>pincode - {e.pincode}</Card.Title>
                <Card.Title>Landmark- {e.landmark}</Card.Title>
                </Card.Body>
              </Card>


                  <Card.Title>Order on {e.orderOn}</Card.Title>


                  


            
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>

    
    </div>
  )
}

export default Order