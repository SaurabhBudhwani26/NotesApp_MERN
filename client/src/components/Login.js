import { useState } from "react";
import React from "react";
import {useNavigate} from 'react-router-dom'

const Login = (props) => {

    const [credentials,setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch('http://localhost:5000/auth/login',{
            method: "POST",
            headers : {
                "Content-Type": 'application/json',   
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert('Logged in successfully', 'success')
        }else{
          props.showAlert("Invalid Credentials",'danger');
        }
        console.log(json)
        setCredentials({email: "", password: ""})
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    
    
  return (
    <div className="container my-3">
      <h2 className="my-4">Login to NotesBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
            
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
            
          />
        </div>
        
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
