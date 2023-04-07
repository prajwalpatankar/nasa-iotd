import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const NoLogInNav = () => {
    return (
        <div className='image-header'>
            <span className='header-left'>
                <Link to='/'><img src='.\NASA_logo.png' className='header-img' alt='header_img'/></Link>
                <h4>NASA Image of the Day</h4>
            </span>
            <span className='header-right'>
                <Link to="/signup" className='sign-out-button'><Button size='sm' variant="secondary"> Sign up </Button></Link>
                <Link to="/login"  className='sign-out-button'><Button size='sm' variant="secondary"> Log In </Button></Link>
            </span>
        </div>
    );
}
export default NoLogInNav;