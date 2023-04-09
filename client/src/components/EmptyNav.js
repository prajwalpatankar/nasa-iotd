import React from 'react';
import { Link } from 'react-router-dom';


const EmptyNav = () => {
    return (
        <div className='image-header'>
            <span className='header-left'>
                <Link to='/'><img src='.\NASA_logo.png' className='header-img' alt='header_img'/></Link>
                <h4>NASA Image of the Day</h4>
            </span>
            <span className='header-right'>

            </span>
        </div>
    );
}
export default EmptyNav;