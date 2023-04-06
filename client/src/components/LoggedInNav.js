import React from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import Button from 'react-bootstrap/Button';


const HeaderImage = ({handleTokenLogout}) => {


    //clear session and log out
    function handleLogOut() {
        handleTokenLogout();
        const token = localStorage.getItem('token')
        message.info("Successfully logged out")
        if (token) {
            localStorage.removeItem('token')
        }
    }

    return (
        <div className='image-header'>
            <span className='header-left'>
                <Link to='/'><img src='.\NASA_logo.png' className='header-img' alt='header_img' /></Link>
                <h3>NASA Image of the Day</h3>
            </span>
            <span className='header-right'>
                <Link to="/home" className='sign-out-button'><Button variant="secondary"> Today's Image </Button></Link>
                <Link onClick={handleLogOut} to="/" className='sign-out-button'><Button variant="secondary"> Log Out </Button></Link>
            </span>
        </div>
    );
}
export default HeaderImage;