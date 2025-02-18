import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const LoginPopup = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext);
  const [currState,setCurrState]=useState("Sign Up");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })

  const onchangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const onlogin=async (event)=>{
    event.preventDefault();
    let newurl=url;
    if(currState=="Login"){
      newurl+="/api/user/login"
    }
    else{
      newurl+="/api/user/register"
    }
    const response=await axios.post(newurl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      toast.success(response.data.message);
      setShowLogin(false);
    }
    else{
      toast.error(response.data.message);
    }
  }
  return (
    <div className='login-popup'>
      <form onSubmit={onlogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />

        </div>
        <div className="login-popup-inputs">
          {currState==="Login"?<></>:<input name="name" onChange={onchangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
          <input name="email" onChange={onchangeHandler} value={data.email} type="email" placeholder='Your email' required/>
          <input name="password" onChange={onchangeHandler} value={data.password}  type="password" placeholder='password' required />
        </div>
        <button type='submit' >{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By Continuing ,i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?
        <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
        <p>Already have a account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
