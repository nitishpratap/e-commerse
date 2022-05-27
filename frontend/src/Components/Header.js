import React from "react";
function Header(){
    console.log(localStorage.getItem("name"))
    return(
        <>
            <div style={{height:'10vh', backgroundColor:'wheat' }}>
                <ul style={{display:'flex', justifyContent:'space-evenly'}}>
                    <a href="/" style={{textDecoration:'none',listStyleType:'none'}}><li>Home</li></a>
                    <a href="/signup" style={{textDecoration:'none',listStyleType:'none'}}><li>Register</li></a>
                    <a href="/signin" style={{textDecoration:'none',listStyleType:'none'}}><li>Log In</li></a>

                </ul>
            </div>
        </>
    )
}
export default Header;