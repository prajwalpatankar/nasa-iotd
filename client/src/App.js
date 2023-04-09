import './App.css';
import React, { useState, useEffect } from 'react';
import LogIn from './components/LogIn';
import NasaImage from './components/NasaImage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import { gapi } from 'gapi-script';
// import { GoogleOAuthProvider } from 'react-google-login';

function App() {

  const [showGif, setShowGif] = useState(true);


  //twinkling star animation
  const createStar = () => {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    return star;
  }

  const numStars = 100;

  const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    gapi.load('client:auth2', async () => {
      gapi.client.init({
        clientId: clientID,
        scope: 'profile'
      })
    })


    for (let i = 0; i < numStars; i++) {
      document.querySelector('.star-background').appendChild(createStar());
    }
  })




  return (
    <div className="App star-background">
      <header className="App-header">
        {/* <GoogleOAuthProvider clientId={clientID}> */}
        <BrowserRouter>
          <Routes>
            <Route>
              <Route exact path="/home" element={<NasaImage />} />
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/login" element={<LogIn />} />
              <Route path="/" element={<HomePage showGif={showGif} setShowGif={setShowGif} />} />
            </Route>
          </Routes>
        </BrowserRouter>
        {/* </GoogleOAuthProvider> */}
      </header>
    </div>
  );


}

export default App;
