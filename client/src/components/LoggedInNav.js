import React from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import Button from 'react-bootstrap/Button';


const HeaderImage = ({setToken}) => {

    //clear session and log out
    const handleLogOut = () => {
        const token = localStorage.getItem('token')
        localStorage.setItem('googleLogIn', 0)
        message.info("Successfully logged out")
        if (token) {
            localStorage.removeItem('token')
        }
        setToken();
    }

    return (
        <div className='image-header'>
            <span className='header-left'>
                <Link to='/'><img src='.\NASA_logo.png' className='header-img' alt='header_img' /></Link>
                <h4>NASA Image of the Day</h4>
            </span>
            <span className='header-right'>
                <Link to="/home" className='sign-out-button'><Button size='sm' variant="secondary"> Today's Image </Button></Link>
                <Link onClick={handleLogOut} to="/" className='sign-out-button'><Button size='sm' variant="secondary"> Log Out </Button></Link>
            </span>
        </div>
    );
}
export default HeaderImage;