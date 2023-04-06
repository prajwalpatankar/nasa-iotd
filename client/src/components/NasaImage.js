import React, { useState, useEffect } from 'react';
import HeaderImage from './LoggedInNav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import Fade from 'react-reveal/Fade';



const NasaImage = () => {

    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            let decoded = jwt_decode(token)
            // const decoded = jwt.verify(token, 'asdasdasd');
            console.log(decoded);

        } catch (err) {
            console.log("Invalid Auth token");
            navigate('/')

        }

        const fetchImage = async () => {
            const response = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`
            );
            const data = await response.json();
            setImageUrl(data.url);
            setTitle(data.title);
            setDescription(data.explanation);
        };
        fetchImage();
        const interval = setInterval(() => {
            fetchImage();
        }, 12 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <HeaderImage />
            <Container className="nasa-image-container d-flex align-items-center">
                <Row className="justify-content-center">
                    <Col lg="6">
                        <Fade bottom delay={200}>
                            <Pulse delay={1000}>
                                <Image src={imageUrl} fluid className='actual-image' style={{ maxHeight: "500px", background: "#fff" }} />
                            </Pulse>
                        </Fade>
                    </Col>
                    <Col lg="6">
                        <Fade bottom delay={600}>
                            <Pulse delay={1400}>
                            <h2>What is this Image about ?<br /></h2>
                            </Pulse>
                        </Fade>
                        <Fade bottom delay={1500}>
                            <Pulse delay={2100}>
                                {/* lnkafnklaklnanldnldsaklnda */}
                                <br />
                                <h3>{title}</h3>
                                <br />
                                <p>{description}</p>
                            </Pulse>
                        </Fade>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NasaImage;