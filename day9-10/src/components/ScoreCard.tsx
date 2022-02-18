import React, { useContext, useState } from "react";
import { CellPlayer } from "./CellPlayer";
import Player2 from "../images/avatar02 1.png"
import Player1 from "../images/Group 13.png"
import Ecllipse from "../images/Ellipse 2.png"
import PlayerContext from "../context/PlayerContext";

function ScoreCard(props:any){

    const {player1}:any=useContext(PlayerContext)
    const {player2}:any=useContext(PlayerContext)

    

    let playerContext=useContext(PlayerContext);
    console.log(playerContext);

    let msg;
    let winDisp="none";
    if(props.score1==2){
        msg=player1+" you won the tournament";
        winDisp="flex";
    }
    else  if(props.score2==2){
        msg=player2+" you won the tournament";
        winDisp="flex";
    }
    else if(props.lastWinner!==CellPlayer.None)
    {
        console.log(props.winner,CellPlayer.None);
        let winner;
        if(props.lastWinner===CellPlayer.Player1)
            winner=player1;
        else
            winner=player2;
        msg=winner+" you won Game"+(props.gameNo-1);
        winDisp="flex";
    }
    let style1;
    let style2;
    let style3;
    let style4;
    if(props.gameStarted){
        style1={
            display:'none'
        }
        style2={
            display:'flex'
        }
    }
    else{
        style1={
            display:'flex'
        }
        style2={
            display:'none'
        }
    }

    if(props.isPlayer1Turn && props.gameStarted){
        style3={
            border: '5px solid orange'
        };
        style4={
            border: 'none'
        }
    }
    else if(!props.isPlayer1Turn && props.gameStarted){
        style4={
            border: '5px solid orange'
        };
        style3={
            border: 'none'
        }
    }
    return (
        <div className="ScoreCard">
            <p className="scoreCardHeader">3 Games Tournament</p>
            <p className="winMsg" style={{display:winDisp}}>Congratulations {msg}</p>
            <p className="gameNo"> {(props.score1==2 || props.score2==2) ?  'Game Over' : 'Playing Game '+props.gameNo}</p>
            <div className="PlayerDetail">
                <div style={style3}>
                    <img src={Player1}></img>
                    <p className="playerNo">Player 01</p>
                    <p className="playerName">{player1}</p>
                    <p className="playerScoreTitle">Score</p>
                    <p className="playerScore">{props.score1}</p>
                </div >
                <div style={style4}>
                    <img src={Player2}></img>
                    <p className="playerNo">Player 02</p>
                    <p className="playerName">{player2}</p>
                    <p className="playerScoreTitle">Score</p>
                    <p className="playerScore">{props.score2}</p>
                </div>
                <div></div>
                <button style={style1} className="startGameButton" onClick={()=>{props.startGame();props.setLastWinner();}}>{(props.score1==2 || props.score2==2) ?  'New Tournament' : 'Start Game'}</button>
                <button className="endTournamentButton" onClick={()=>{if(props.isPlayer1Turn){props.setScore2()}else{props.setScore1()}}}>End Tournament</button>
                <button style={style2} className="startGameButton" onClick={()=>{props.undoClicks()}}>Undo Step</button>

            </div>
        </div>
    )
}

export default ScoreCard;