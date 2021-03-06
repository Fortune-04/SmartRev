import React, {Fragment, useState} from 'react';
import { Link } from "react-router-dom";

const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = e =>{
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password };
          const response = await fetch(
            "http://localhost:4400/login",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
    
          const parseRes = await response.json();

        //   localStorage.setItem("token",parseRes.token);
        //   setAuth(true);
    
          if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            //toast.success("Logged in Successfully");
          } else {
            setAuth(false);
            //toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
    };


    return(
        <Fragment>
            <div className = "container">
            <h1 className="mt-5 text-center">Login</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="password"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/signup">Register</Link>
            </div>
        </Fragment>
    )
}

export default Login 