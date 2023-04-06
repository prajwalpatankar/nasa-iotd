import './App.css';
import React, { useState, useEffect } from 'react';
import LogIn from './components/LogIn';
import NasaImage from './components/NasaImage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
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

  useEffect(() => {

    for (let i = 0; i < numStars; i++) {
      document.querySelector('.star-background').appendChild(createStar());
    }
  }, [])


  
  const [showGif, setShowGif] = useState(true);

  return (
    <div className="App star-background">
      <header className="App-header">
        <GoogleOAuthProvider clientId="1063505904647-as9olt1bkpkm2g7r5e7hliecjcgna7rg.apps.googleusercontent.com">
          <BrowserRouter>
            <Routes>
              <Route>
                <Route exact path="/home" element={<NasaImage />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/login" element={<LogIn />} />
                <Route exact path="/" element={<HomePage showGif={showGif} setShowGif={setShowGif} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </header>
    </div>
  );


}

export default App;
