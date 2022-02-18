import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StartGame from './components/StartGame';
import Board from './components/Board';
import Game from './components/Game';
import ScoreCard from './components/ScoreCard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Demo from './components/Demo';
import PlayerContext from './context/PlayerContext';


function App() {
  
  
  const [player1,setPlayer1]=useState("Player1");
  const [player2,setPlayer2]=useState("Player2");
  
  

  return (
    <div className="App">
      <BrowserRouter>
        <PlayerContext.Provider value={{player1,setPlayer1,player2,setPlayer2}}>
          <Routes>
            
              <Route path="/" element={<StartGame/>} />
              <Route path="/game" element={<Game/>} />
              <Route path="/demo" element={<Demo/>} />
          </Routes>
        </PlayerContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
