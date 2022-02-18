import React from "react";
import Row from "./Row";

function Board(props:any){
    let rows=[];

    for(let i=0;i<props.cells.length;i++){
        rows.push(
            <Row 
                key={i}
                rowId={i}
                cells={props.cells[i]}
                handleClick={props.handleClick}
                gameStarted={props.gameStarted}
            />
        );
    }
    

    return (
        <div className="Board">
            {rows}
        </div>
    );
}

export default Board;