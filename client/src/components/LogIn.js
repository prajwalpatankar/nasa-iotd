import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoLogInNav from "./NoLogInNav";
import jwt_decode from 'jwt-decode';
import HeadShake from 'react-reveal/HeadShake';
import { message } from 'antd';
import { GoogleLogin } from '@react-oauth/google';



const LogIn = () => {
    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_BASE_URL;

    // validate login   
    const [token, setToken] = useState([]);

    // Handle form values
    const [formvalue, setFormValue] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        //validating login
        setToken(localStorage.getItem('token'));
        try {
            let decoded = jwt_decode(token);
            console.log("User Details :", decoded)
            navigate('home')

        } catch (err) {
            console.log("Invalid Auth token");
        }
    }, [navigate, token])

    //formchange event listener
    const formChangeHandler = (event) => {
        setFormValue({ ...formvalue, [event.target.name]: event.target.value });
        // console.log(formvalue)
    }

    // submit login request
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseUrl + "login", formvalue)
            .then(response => {
                console.log(response)
                message.success("Successfully logged in")
                setToken({
                    token: response.data.token
                })
                localStorage.setItem("token", JSON.stringify(response.data.token))
                navigate('/home');
            })
            .catch((error) => {
                // invalid credentials
                message.error("Invalid username or password")
            })
    }

    return (
        <div>
            <NoLogInNav />
            <HeadShake>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h2 className="text-center mb-4">Log In</h2>
                            <form onSubmit={event => handleSubmit(event)}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" onChange={(event) => formChangeHandler(event)} value={formvalue.username} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(event) => formChangeHandler(event)} value={formvalue.password} required />
                                </div>
                                <button className="btn btn-primary btn-block mt-4">Log In</button>
                            </form>
                            <p className="form-bottom-links"><Link to="/signup">Don't have an account yet? Sign up!</Link></p>
                            <div style={{maxWidth: "200px", textAlign: "center"  }}>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        console.log(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </HeadShake>
        </div>
    );
}

export default LogIn;
