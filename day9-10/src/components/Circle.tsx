import React from "react";
import { CellPlayer } from "./CellPlayer";
import Player2 from "../images/avatar02 1.png"
import Player1 from "../images/Group 13.png"
import Ecllipse from "../images/Ellipse 2.png"

function Circle(props:any){
    let circleColor = 'white';
    let url= Ecllipse;
    if (props.cell ===  CellPlayer.Player1)
    {
        circleColor = 'black';
        url=Player1;
    }
    else if (props.cell === CellPlayer.Player2) {
        circleColor = 'red';
        url=Player2;
    }

    const style = {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '100%',
        width: '98%',
        height: '90%'
    };
    return (
       <div style={style}>
           <img src={url} />
        </div>
    );
}

export default Circle;