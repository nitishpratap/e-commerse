import React from 'react'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'


import Home from './Home';
import SignUP from './SignUp';
import SignIn from './SignIn';
import Cart from './Cart';
import Logout from './Logout'
import Error from './Error';
import Buy from './Buy';
import About from './About';
import Order from './Order';
const RouteCode = () => {


  return (
    <Router>
    <div style={{display:'flex',justifyContent:'space-evenly',height:'10vh', backgroundColor:'wheat'}}>
      <Link to=''  style={{textDecoration:'none'}}>Home</Link>
      <Link to='/signup' style={{textDecoration:'none'}}>Register</Link>
      <Link to='/signin'style={{textDecoration:'none'}} >Login</Link>
      <Link to='/cart'style={{textDecoration:'none'}} >Cart</Link>
      <Link to='/signout'style={{textDecoration:'none'}} >Logout</Link>
      <Link to='/account'style={{textDecoration:'none'}} >{localStorage.getItem("name")}</Link>
      <Link to='/buy'style={{textDecoration:'none'}} ></Link>
      <Link to={{pathname :'https://google.com'}} target = '_blank'></Link>
      <Link to='/order'style={{textDecoration:'none'}} >Order</Link>


      </div>


        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/signin" element={<SignIn/>}/>
          <Route exact path="/signup" element={<SignUP/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          <Route exact path="/signout" element={<Logout/>}/>
          <Route exact path="/buy" element={<Buy/>}/>
          <Route exact path="/account" element={<About/>}/>
          <Route exact path="/order" element={<Order/>}/>
          
          <Route  path="*" element={<Error/>}/>


        </Routes>
      
    </Router>
  );
}

export default RouteCode;