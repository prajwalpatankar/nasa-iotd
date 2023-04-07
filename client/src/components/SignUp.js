import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoLogInNav from "./NoLogInNav";
import jwt_decode from 'jwt-decode';
import HeadShake from 'react-reveal/HeadShake';
import { message } from 'antd';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';


const SignUp = () => {
    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_BASE_URL;

    // Google client Id
    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
        if (localStorage.getItem('googleLogIn') === '1') {
            console.log("INNN")
            navigate('/home')
        } else {
            try {
                let decoded = jwt_decode(token);
                console.log("User Details: ", decoded)
                navigate('home')

            } catch (err) {
                console.log("Invalid Auth token");
            }
        }
    }, [navigate, token])

    //formchange event listener
    const formChangeHandler = (event) => {
        setFormValue({ ...formvalue, [event.target.name]: event.target.value });
        // console.log(formvalue)
    }

    // submit signup request
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(baseUrl + "signup", formvalue)
            .then(response => {
                console.log(response)
                message.success("Sign Up Successful! Please Log In.")
                navigate('/login')
            })
            .catch((error) => {
                // if user already exists
                if (error.response.status === 409) {
                    message.warning("Username already exists")
                }
            })
    }

    const handleGoogleLogin = (res) => {
        console.log("THISSSS", res.accessToken);
        localStorage.setItem('googleLogIn', JSON.stringify(1))
        localStorage.setItem('token', JSON.stringify(res.accessToken))
        navigate('/home');
    }

    return (
        <div>
            <NoLogInNav />
            <HeadShake>
                <div className="container my-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h2 className="text-center mb-4">Sign Up</h2>
                            <form onSubmit={event => handleSubmit(event)}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" onChange={(event) => formChangeHandler(event)} value={formvalue.username} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={(event) => formChangeHandler(event)} value={formvalue.password} required />
                                </div>
                                <button className="btn btn-primary btn-block mt-4">Sign Up</button>
                            </form>
                            <p className="form-bottom-links"><Link to="/login">Already have an account? Log in!</Link></p>
                            <div style={{ maxWidth: "200px", textAlign: "center" }}>
                                <GoogleLogin
                                    clientId={clientID}
                                    onSuccess={handleGoogleLogin}
                                    onFailure={() => {
                                        console.log('Login Failed');
                                    }}
                                    // isSignedIn={true}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </HeadShake>
        </div>
    );
}

export default SignUp;
