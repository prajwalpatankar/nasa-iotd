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
import { gapi } from 'gapi-script';
import EmptyNav from "./EmptyNav";


const SignUp = () => {
    const navigate = useNavigate();

    const baseUrl = process.env.REACT_APP_BASE_URL;

    // Google client Id
    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    //spinner
    const [spin, setSpin] = useState(true)

    // validate login
    const [token, setToken] = useState();

    // Handle form values
    const [formvalue, setFormValue] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        //validating login
        setToken(localStorage.getItem('token'));
        try {
            const auth = gapi.auth2.getAuthInstance();
            if (auth.isSignedIn.get()) {
                console.log("Google Auth")
                message.info("Already Logged In")
                navigate('/home')
            } else {
                try {
                    let decoded = jwt_decode(token);
                    console.log("User Details :", decoded)
                    message.info("Already Logged In")
                    navigate('/home')

                } catch (err) {
                    console.log("Invalid Auth token");
                }
            }
        } catch (error) {
            try {
                let decoded = jwt_decode(token);
                console.log("User Details :", decoded)
                message.info("Already Logged In")
                navigate('/home')

            } catch (err) {
                console.log("Invalid Auth token");
            }
        }
        setTimeout(() => {
            setSpin(false)
        }, 100)
    }, [navigate, token])

    //formchange event listener
    const formChangeHandler = (event) => {
        setFormValue({ ...formvalue, [event.target.name]: event.target.value });
        // console.log(formvalue)
    }

    // submit signup request
    const handleSubmit = (event) => {
        event.preventDefault();
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
        if (re.test(formvalue.password)) {

            message.loading('Signing Up');
            axios.post(baseUrl + "signup", formvalue)
                .then(response => {
                    console.log(response)
                    message.destroy()
                    message.success("Sign Up Successful! Please Log In.")
                    navigate('/login')
                })
                .catch((error) => {
                    // if user already exists
                    if (error.response.status === 409) {
                        message.destroy()
                        message.warning("Username already exists")
                    }
                })
        } else {
            message.error("Password should have minimum 8 alphanumeric characters and at least 1 special symbol")
        }
    }

    const handleGoogleLogin = (res) => {
        console.log("THISSSS", res.accessToken);
        localStorage.setItem('googleLogIn', JSON.stringify(1))
        localStorage.setItem('token', JSON.stringify(res.accessToken))
        navigate('/home');
    }

    return (
        spin ?
            <EmptyNav />
            :
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
