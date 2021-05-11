import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';



const SignUpPage = () => {

    const [usernameReg, setUsernameReg] = useState(''); // sets the state of username and password when inputting in input fields
    const [passwordReg, setPasswordReg] = useState('');
    const [signUpStatus, setStatus] = useState(''); // checks the status of signing in
    const [isSigned, setSigned] = useState(false); // true or false if user is signed up


    //when we click the register button, this function will be called. First we will send a post request via axios to 
    //our backend server. Then we will set two variables, named username and password to eb equal to our username and password
    //that was inputted. Then the backend will handle the insertion as long as they follow the neccessary constraints. Then they will
    //send back a response. Then we will have a promise that says if there is a resp.data.message, that means we got an error, and we
    //will display that message, else we will set the status to a welcome message and the username.
    const onRegister = () => {
        axios.post("http://localhost:3001/register/", {
            username: usernameReg,
            password: passwordReg,
            }).then((resp)=> {
                if (resp.data.message )
                {
                    setStatus(resp.data.message);
                }
                else {
                    console.log(resp.data);
                    setStatus("Welcome, " + resp.data.username +"! You are now registered!");
                    setSigned(true);
                }
            })    
    }  

    return (
        <div className='register'>
            <h1>Sign Up: </h1>
            {signUpStatus} 
            <label>Username</label>
            <input type="text" placeholder='Username...' onChange={(e)=>setUsernameReg(e.target.value)}/>
            <label>Password</label>
            <input type='password' placeholder='Password...' onChange={(e)=>setPasswordReg(e.target.value)}/>
            <button onClick={onRegister}>register</button>
            <p>Have an account? <Link to='/'>Log in</Link></p>
            {isSigned ? <Redirect to='/'/> : null}
   

        </div> 
    );
}

export default SignUpPage;