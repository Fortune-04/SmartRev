import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

const SignUp = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        phonenumber:"",
        school: ""
    });

    const { username, fullname, email, password, phonenumber, school } = inputs;

    const onChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault()
        try {
            const body = { username, fullname, email, password, phonenumber, school };
            const response = await fetch(
              "http://localhost:4400/register",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify(body)
              }
            );
            const parseRes = await response.json();
            
            localStorage.setItem("token", parseRes.token);
            setAuth(true);

          } catch (err) {
            console.error(err.message);
          }
    };


    return(
        <Fragment>
            <div className="container">
            <h1 className="mt-5 text-center">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="username"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="fullname"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
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
                <input
                    type="text"
                    name="phonenumber"
                    value={phonenumber}
                    placeholder="phoneumber"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
                <input
                    type="text"
                    name="school"
                    value={school}
                    placeholder="school"
                    onChange={e => onChange(e)}
                    className="form-control my-3"
                />
            <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>
            </div>
        </Fragment>
    )
}

export default SignUp