import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Button from 'react-bootstrap/Button';
import { gapi } from 'gapi-script';
import NoLogInNav from './NoLogInNav';


const HeaderImage = () => {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(true);

    //clear session and log out
    const handleLogOut = () => {
        setLoggedIn(false);
        const token = localStorage.getItem('token')
        const auth = gapi.auth2.getAuthInstance();
        auth.signOut()
        message.info("Successfully logged out")
        if (token) {
            localStorage.removeItem('token')
        }
        navigate('/')
    }

    return (
        loggedIn ?
            <div className='image-header'>
                < span className='header-left' >
                    <Link to='/'><img src='.\NASA_logo.png' className='header-img' alt='header_img' /></Link>
                    <h4>NASA Image of the Day</h4>
                </span >
                <span className='header-right'>
                    <Link to="/home" className='sign-out-button'><Button size='sm' variant="secondary"> Today's Image </Button></Link>
                    <Link onClick={handleLogOut} to="/" className='sign-out-button'><Button size='sm' variant="secondary"> Log Out </Button></Link>
                </span>
            </div >
            :
            <NoLogInNav />
    );
}
export default HeaderImage;