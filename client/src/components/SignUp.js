import React,{useState} from "react";
import {useNavigate} from 'react-router-dom' 
const SignUp = (props) => {
    const [credentials,setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch('http://localhost:5000/auth/createuser',{
            method: "POST",
            headers : {
                "Content-Type": 'application/json',   
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken)
            navigate('/')
            props.showAlert('Account crerated succesfully','success')
        }else{
            props.showAlert("Invalid Credentials",'danger');
        }
        console.log(json)
        setCredentials({name: "", email: "", password: "", cpassword: ""})
    }
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    
  return (
    <div className="conatainer my-3">
        <h2 className="my-4">Create New account on NotesBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.name}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          
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
            required
            minLength={8}
            value={credentials.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={8}
            value={credentials.cpassword}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
