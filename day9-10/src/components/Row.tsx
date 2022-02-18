import React from "react";
import Cell from "./Cell";

function Row(props:any){
    

    let cells=[];
    for(let i=0;i<props.cells.length;i++){
        cells.push(
            <Cell
                key={i}
                rowId={props.rowId}
                columnId={i}
                cell={props.cells[i]}
                handleClick={props.handleClick}
                gameStarted={props.gameStarted}
            />
        );
    }

    return (
        <div className="Row">
            {cells}
        </div>
    );
}

export default Row;