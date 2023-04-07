import React, { useEffect, useState } from 'react';
import HeaderImage from './LoggedInNav';
import NoLogInNav from './NoLogInNav';
import jwt_decode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';


const HomePage = ({ showGif, setShowGif }) => {
    const [token, setToken] = useState();
    const [fadeAway, setFadeAway] = useState(true);
    const [timer, setTimer] = useState(showGif ? 7000 : 200)

    useEffect(() => {
        if (localStorage.getItem('googleLogIn') === '1') {
            setToken('1');
        } else {
            setToken(localStorage.getItem('token'));
            try {
                let decoded = jwt_decode(localStorage.getItem('token'))
                console.log(decoded);

            } catch (err) {
                console.log(err);
                console.log("Invalid Auth token");
                setToken();
            }
        }
        if (showGif) {
            setTimer(7000)
            setTimeout(() => {
                setFadeAway(false);
            }, 6700);
            setTimeout(() => {
                setShowGif(false);
            }, 7000);
        } else {
            setTimer(0);
        }
    })


    // styling for opening animation
    const imgStyle = {
        position: "absolute",
        zIndex: 2,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: fadeAway ? 1 : 0,
        transition: "opacity 0.3s ease-out",
    };

    const imgStyleHidden = {
        zIndex: -1,
    };

    //handle logout parent declaration
    const handleTokenLogout = () => {
        setToken();
    }

    return (
        <div className='homepage-div'>
            {showGif ?
                <img id="my-gif" src="./new_opening.gif" alt="NASA GIF" style={showGif ? imgStyle : imgStyleHidden} />
                : <></>
            }
            <div style={{ zIndex: 1 }}>
                {token ?
                    // <HeaderImage handleTokenLogout={handleTokenLogout} />
                    <HeaderImage setToken={setToken} />
                    :
                    <NoLogInNav />
                }
                <div style={{ marginTop: "150px" }} className="d-flex align-items-center justify-content-center">
                    <Container>
                        <Row>
                            <Col sm="12" lg="6">
                                <Fade bottom delay={timer}>
                                    <img className='image-container' src='./homeImage1.jpg' height={"400px"} style={{ padding: "30px" }} alt='earth_img' />
                                </Fade>
                            </Col>
                            <Col sm="12" lg="6" style={{ marginTop: "50px" }}>
                                <Fade bottom delay={timer + 200}>
                                    <h3>A Web app to display the image of the day by using NASA API. <br /><br /></h3>
                                    <h5><Link to='/signup'>Signup</Link> / <Link to='/login'>Login</Link> to view today's image of the day!<br /><br /><br /></h5>
                                </Fade>
                                <div style={{ fontSize: "18px" }}>
                                    <ul><Fade bottom delay={timer + 400}>
                                        <li>API used : https://api.nasa.gov/planetary/apod </li>
                                    </Fade>
                                        <Fade bottom delay={timer + 500}>
                                            <li>Frontend : React </li>
                                        </Fade>
                                        <Fade bottom delay={timer + 700}>
                                            <li>Backend : Node </li>
                                        </Fade>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div >
    );
}
export default HomePage;