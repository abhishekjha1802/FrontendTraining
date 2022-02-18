import React from "react";
import Circle from "./Circle";
function Cell(props:any){
    console.log("app");
    const style = {
        height: 50,
        width: 50,
        border: '1px solid black',
        backgroundColor: 'yellow'
    };
    return (
        <div className="Cell" onClick={() => {if(props.gameStarted){props.handleClick(props.rowId, props.columnId)}}}>
            <Circle cell={props.cell}/>
        </div>
    )
}

export default Cell;