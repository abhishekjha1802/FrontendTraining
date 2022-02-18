import React, { useContext, useState } from "react";
import Player2 from "../images/avatar02 1.png"
import Player1 from "../images/Group 13.png"
import {  useNavigate } from 'react-router-dom';

import { Link, Navigate } from "react-router-dom";
import PlayerContext from "../context/PlayerContext";
function StartGame(props:any){
    
    let {setPlayer1}:any=useContext(PlayerContext);
    let {setPlayer2}:any=useContext(PlayerContext)

    

    return(
        <div className="startGame">
            <div className="player1Card">
                <img src={Player1}/>
                <div>
                    <p>Player01</p>
                    <input type="text" onChange={e=> setPlayer1(e.target.value)}></input>
                </div>
            </div>
            <div className="player2Card">
                <img src={Player2}/>
                <div>
                    <p>Player02</p>
                    <input type="text" onChange={e=> setPlayer2(e.target.value)}></input>
                </div>
            </div>
            <div className="buttonStartGame">
            
            <Link to="/game" ><input type="button" value="Start Game"  ></input></Link>
            </div>
        </div>
    )
}

export default StartGame;