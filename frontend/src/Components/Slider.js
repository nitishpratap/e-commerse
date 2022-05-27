import React,{useState} from 'react'
import first from  '../Products/slider/1.jpg'
function Slider() {
    const [imageName,setImageName] = useState('1.jpg')
    const name =  '../Products/slider/1.jpg';


    setInterval(() => {
        // setImageName()
    }, 1000);
  return (
    <div>
    <div style={{width:'98vw',height:'15rem'}}>
    
        <img src={require('../Products/slider/3.png')} alt="hdruyherd"  style={{width:'100%',height:'100%'}}></img>
        </div>
    </div>


  )
}

export default Slider