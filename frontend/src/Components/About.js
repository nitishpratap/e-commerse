import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";


function About() {
  const navigate = useNavigate();
  const [user,handleUser] = useState({})
  const [name,setName] = useState(user.name)
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
      handleUser(data.rootUser);
      // console.log(data.rootUser)

      if (!res.status === 200) {
        
        const err = new Error(res.err);
        throw err;
      }
    } catch (error) {
      navigate("/signin");

      console.log(error);
    }
  };


  useEffect(() => {
    
  callCartPage()
   
  }, [])
  

  return (
    <div>

    

    <form>

    <div style={{display:'block'}}>
      Name  <span style={{marginLeft:'5.4rem'}}></span><input value={user.name} disabled></input><br></br><br/>
      Email <span style={{marginLeft:'5.6rem'}}></span><input  value={user.email} disabled></input><br></br><br/>
      Password <span style={{marginLeft:'4rem'}}></span> <input  value={user.password} disabled></input><br></br><br/>
      Address  <span style={{marginLeft:'4.5rem'}}></span><input  value={user.address1} disabled></input><br></br><br/>
      Pincode <span style={{marginLeft:'4rem'}}></span>  <input value={user.pincode} disabled></input><br></br><br/>
      state <span style={{marginLeft:'5.4rem'}}></span> <input  value={user.state} disabled></input><br></br><br/>
      landmark <span style={{marginLeft:'3.5rem'}}></span> <input value={user.landmark} disabled ></input><br></br><br/>
      </div>


    </form>




    </div>
  )
}

export default About