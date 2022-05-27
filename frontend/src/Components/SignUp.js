import React,{useState} from "react";
import { BsPersonFill,BsPhone} from "react-icons/bs";
import { MdEmail,MdPassword,MdOutlineLocalShipping} from "react-icons/md";
import {  FaAddressBook} from "react-icons/fa";
import { useEffect } from "react";

function SignUP(){

    const [user,setuser] = useState({ 
        name:'',
        email:'',
        password:'',
        phone:'',
        address1:'',
        pincode:'',
        state:'',
        landmark:''

    });
    let name,value;

  const handleInput=(e)=>{
    name =e.target.className;
    value = e.target.value;
    setuser({...user,[name]:value})
  }

  const postData = async(e)=>{
    e.preventDefault();
    const {name,email,password,phone,address1,pincode,state,landmark} = user;
    const res = await fetch('/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name,email,password,phone,address1,pincode,state,landmark
        })

    })
    const data = await res.json();
    if(res.status===400|| !data){
        console.log(data);

        
        window.alert('Invalid registration')
    }
    else{
        window.alert('registration complete');
        
    }


  }
    return(
        <>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'60rem',height:'78vh',marginTop:'3rem',marginLeft:'13vw',backgroundColor:'whitesmoke'}} >
            <div className="sign-up" >
                <form  method="POST">
                <h1>Sign Up</h1>
                  <BsPersonFill></BsPersonFill>
                <input type='text' className="name" placeholder="Your Name" autoComplete="off" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <MdEmail></MdEmail>
                    <input type='email' className="email" placeholder="Your Email" autoComplete="off" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <MdPassword></MdPassword>
                    <input type='password' className="password" placeholder="Your Password" autoComplete="off" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <BsPhone></BsPhone>
                    <input type='number' className="phone" placeholder="Your Phone" autoComplete="off" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <FaAddressBook></FaAddressBook>
                    <input type='text' className="address1" placeholder="Your Address" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <MdOutlineLocalShipping></MdOutlineLocalShipping>
                    <input type='number' className="pincode" placeholder="Your Pincode" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <MdOutlineLocalShipping></MdOutlineLocalShipping>
                    <input type='text' className="state" placeholder="Your State" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <MdOutlineLocalShipping></MdOutlineLocalShipping>
                    <input type='text' className="landmark" placeholder="Your LandMark" onChange={handleInput}></input>
                    <br></br>
                    <br></br>
                    <input type='submit'  className="submit" style={{backgroundColor:'lightskyblue',marginLeft:'1rem'}} value="Register" onClick={postData}></input>
                   
                </form>
            </div>
            <div className="img">
                <img src="https://media.istockphoto.com/photos/shopping-online-concept-shopping-service-on-the-online-web-with-by-picture-id1133980246?k=20&m=1133980246&s=612x612&w=0&h=bwut2YUV7gtnjrv354523xU_9S-TtKQOqGTdiGMsPfs=" alt="signup" width='400px' style={{marginLeft:'5rem'}}/>
            </div>
            </div>
            
        </>
    )
}
export default SignUP;