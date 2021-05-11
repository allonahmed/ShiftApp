// eslint-disable-next-line
import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import './App.css';
import './shift.css'
// eslint-disable-next-line
import Shift from './shift.js'

function Main() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [countInvalid, setInvalid] = useState(0); //counts the amount of times a user inputs an invalid email/user
  const [loginStatus, setLoginStatus] = useState(''); 
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [getName, setName] = useState('');
  const [type, setType] = useState('');

  // const [isPostNew, setPostNew] = useState(false);

    // axios.defaults.withCredentials = true; //ma

  const onLogin = () => {
    axios.post("http://localhost:3001/login/", {
      username: username,
      password: password,
      isLoggedIn: "true",
    }).then((resp)=>{
        if (resp.data.message)
        {
          setInvalid(countInvalid+1);
          setLoginStatus(resp.data.message + " " + (5 - countInvalid) + ' login attempts left!');
          setLoggedIn(false);
          
        }
        else {    
          setType(resp.data[0].usertype);
          console.log(type);
          if (resp.data[0].username === username && resp.data[0].password === password){
            setLoginStatus("welcome back, " + resp.data[0].username);
            setLoggedIn(true);
            setName(resp.data[0].username); 
          }
          else if (resp.data[0].username === username && resp.data[0].password !== password)
          {
            setInvalid(countInvalid+1);
            setLoginStatus("Invalid Username/Password, " + (5 -countInvalid) + ' login attempts left!');
            setLoggedIn(false);

          }
          else if (resp.data[0].username !== username && resp.data[0].password === password)
          {
            setInvalid(countInvalid+1);
            setLoginStatus("Invalid Username/Password, " + (5 -countInvalid) + ' login attempts left!');
            setLoggedIn(false);
          }
      }
        
    });

  }
  // const redirectTo = () => {
  //   let link = "/";
  //   if (type === " Manager")
  //   {
  //     type = "/shift/manager"
  //   }
  //   if(type === "general")
  // }

  // useEffect(()=>{
  //   // axios.get('http://localhost:3001/get').then((resp) => {
  //   //   setUsername(resp.data.username)
  //   // })
  //   // console.log(isLoggedIn);
    
  // },[])

  // eslint-disable-next-line
  let Condition =  getName.length < 0 ? React.Fragment : Link; 

  const redirectTo =(type)=> {
    let link = "/";
    if (type === "Manager"){
      link = "/shiftman";
    }
    else if (type === "General Manager"){
      link = "/shiftgen"
    }
    else {
      link = "/shift"
    }
    return link;
  }
  
  return (


    <div className="container">


        <div className='login'>
          <h1>Sign in:</h1>
          <h3>{ countInvalid === 6 ? "You're locked from logging in for 30 minutes": loginStatus}</h3>
          <label>Username: </label>
          <input type='text' placeholder='Username...' onChange={(e)=>setUsername(e.target.value)}/>
          <label>Password: </label>
          <input type='password' placeholder='Password...' onChange={(e)=>setPassword(e.target.value)} />
          <button onClick={onLogin} disabled = {countInvalid ===6 ? "disabled":""}>log in</button>
          {isLoggedIn ? <Redirect to ={redirectTo(type)}/> : null}
          <p>no account? <Link to="/signup">sign up</Link></p>
        </div>

    </div>
  );
}

export default Main;
