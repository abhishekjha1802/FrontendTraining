import React, { Component, useContext } from "react";
import { CellPlayer }  from './CellPlayer';
import Board from "./Board";
import ScoreCard from "./ScoreCard";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PlayerContext from "../context/PlayerContext";


function Game(props:any){
    let numRows = 8;
    let numCols = 8;

    
    const [cells,setCells]=useState(getInitialCells())
    const [winner,setWinner]=useState(CellPlayer.None)
    const [lastWinner,setLastWinner]=useState(CellPlayer.None)
    const [gameStarted,setGameStarted]=useState(false)
    const [gameNo,setGameNo]=useState(1)
    const [isPlayer1Turn,setPlayer1Turn]=useState( Math.random() >= 0.5)
    const [score1,setScore1]=useState(0)
    const [score2,setScore2]=useState(0)
    const [lr,setLr]=useState(-1)
    const [lc,setLc]=useState(-1)
    

    
    

    function getInitialCells() {
        let cells: Array<Array<CellPlayer>> = [];
        for (let i = 0; i < numRows; i++) {
            cells.push(new Array(numCols).fill(CellPlayer.None));
        }
        return cells;
    }

    function handleClick(row: number, column: number) {
       
        if (winner !== CellPlayer.None) {
            return;
        }

        let rowToBeUsed: number = availableCellInColumn(column);
        console.log(rowToBeUsed,column);
        
        if (rowToBeUsed !== -1) {
            const newCells = updateCellOnClick(rowToBeUsed, column);
            if (checkVictory(rowToBeUsed, column, newCells)) {
                

                if( (isPlayer1Turn)){
                    setCells(newCells)
                    setWinner(CellPlayer.Player1)
                    setScore1(score1+1)
                    setLastWinner(CellPlayer.Player1)
                    restartGame();
                }else{
                    setCells(newCells)
                    setWinner(CellPlayer.Player2)
                    setScore2(score2+1)
                    setLastWinner(CellPlayer.Player2)
                    restartGame();
                    
                }

                //this.setState({cells: newCells, winner: (this.state.isPlayer1Turn) ? CellPlayer.Player1 : CellPlayer.Player2});

                
                

            } else {
                setCells(newCells)
                setPlayer1Turn(!isPlayer1Turn)
                setLr(rowToBeUsed)
                setLc(column)
                
                
            }
        } else {
            setPlayer1Turn(!isPlayer1Turn)
        }
    }

    
    function undoClick(){
         
        if(lr==-1 || lc==-1)
            return;
        let tempCells: Array<Array<CellPlayer>> = [];
        for (let i = 0; i < 8; i++) {
            tempCells.push(cells[i].slice());
        }
        tempCells[lr][lc] =CellPlayer.None;

        /*setCells(tempCells)
        setWinner(CellPlayer.Player2)
        setScore2(score2+1)
        setLastWinner(CellPlayer.Player2)
        setCells(newCells)
        setPlayer1Turn(!isPlayer1Turn)
        setLr(-1)
        setLc(-1)
        setGameNo(gameNo+1)
        setGameStarted(false)
        */
        setCells(tempCells)
        setPlayer1Turn(!isPlayer1Turn)
        setLr(-1)
        setLc(-1)
        
    }


   
    function restartGame() {
        setCells(getInitialCells())
        setWinner(CellPlayer.None)
        setGameNo(gameNo+1)
        setGameStarted(false)
        setPlayer1Turn(isPlayer1Turn)
        
    }

    function updateCellOnClick(row: number, column: number): Array<Array<CellPlayer>> {
        let tempCells: Array<Array<CellPlayer>> = [];
        for (let i = 0; i < 8; i++) {
            tempCells.push(cells[i].slice());
        }
        tempCells[row][column] =
            (isPlayer1Turn ? CellPlayer.Player1 : CellPlayer.Player2);
        return tempCells;
    }

    function availableCellInColumn(column: number): number {
        for (let i = numRows - 1; i >= 0; i--) {
            if (cells[i][column] === CellPlayer.None) {
                return i;
            }
        }

        return -1;
    }

    function checkVictory(row: number, column: number, cells: Array<Array<CellPlayer>>): boolean {
        return checkVerticalVictory(column, cells) ||
            checkHorizontalVictory(row, cells) ||
            checkDiagonalVictory(cells);
    }

    function checkHorizontalVictory(row: number, cells: Array<Array<CellPlayer>>): boolean {
        const playerToBeChecked = isPlayer1Turn ? CellPlayer.Player1 : CellPlayer.Player2;
        const maxColumnToStartThe4 = 3;
        for (let j = 0; j <= maxColumnToStartThe4; j++) {
            if (cells[row][j] === playerToBeChecked &&
                cells[row][j + 1] === playerToBeChecked &&
                cells[row][j + 2] === playerToBeChecked &&
                cells[row][j + 3] === playerToBeChecked) {
                    return true;
            }
        }
        return false;
    }

    function checkVerticalVictory(column: number, cells: Array<Array<CellPlayer>>): boolean {
        const playerToBeChecked = isPlayer1Turn ? CellPlayer.Player1 : CellPlayer.Player2;
        const maxRowToStartThe4 = 2;
        for (let i = 0; i <= maxRowToStartThe4; i++) {
            if (cells[i][column] === playerToBeChecked &&
                cells[i + 1][column] === playerToBeChecked &&
                cells[i + 2][column] === playerToBeChecked &&
                cells[i + 3][column] === playerToBeChecked) {
                    return true;
            }
        }
        return false;
    }

    // TODO: diagonal check should be refactored.
    function checkDiagonalVictory(cells: Array<Array<CellPlayer>>): boolean {
        const player = isPlayer1Turn ? CellPlayer.Player1 : CellPlayer.Player2;
        return checkTopLeftBottomRightDiagonal(player, cells) ||
            checkBottomLeftTopRightDiagonal(player, cells);
    }

    function checkTopLeftBottomRightDiagonal(player: CellPlayer, cells: Array<Array<CellPlayer>>): boolean {
        let rowIndex = 0, colIndex = 0;
        const maxRowToStartDiagonal = 2;
        const maxColumnToStartDiagonal = 3;

        while (rowIndex <= maxRowToStartDiagonal) {
            while (colIndex <= maxColumnToStartDiagonal) {
                if (rowIndex + 3 < numRows && colIndex + 3 < numCols) {
                    if (cells[rowIndex][colIndex] === player &&
                        cells[rowIndex + 1][colIndex + 1] === player &&
                        cells[rowIndex + 2][colIndex + 2] === player &&
                        cells[rowIndex + 3][colIndex + 3] === player) {
                            return true;
                    }
                }
                colIndex++;
            }
            rowIndex++;
            colIndex = 0;
        }
        return false;
    }

    function setLastWinnerFunc(){
        setLastWinner(CellPlayer.None);
    }

    function checkBottomLeftTopRightDiagonal(player: CellPlayer, cells: Array<Array<CellPlayer>>): boolean {
        let rowIndex = numRows - 1, colIndex = 0;
        const minRowToStartDiagonal = 3;
        const maxColumnToStartDiagonal = 3;

        while (rowIndex >= minRowToStartDiagonal) {
            while (colIndex <= maxColumnToStartDiagonal) {
                if (rowIndex - 3 >= 0 && colIndex + 3 < numCols) {
                    if (cells[rowIndex][colIndex] === player &&
                        cells[rowIndex - 1][colIndex + 1] === player &&
                        cells[rowIndex - 2][colIndex + 2] === player &&
                        cells[rowIndex - 3][colIndex + 3] === player) {
                            return true;
                    }
                }
                colIndex++;
            }
            rowIndex--;
            colIndex = 0;
        }
        return false;
    }

    

   
    let location =useLocation();
    
    
    return(
        
        <div>
            <ScoreCard setScore1={()=>{setScore1(2);setGameStarted(false);}}
                setScore2={()=>{setScore2(2);setGameStarted(false);}} isPlayer1Turn={isPlayer1Turn}  lastWinner={lastWinner}  setLastWinner={setLastWinnerFunc} gameNo={gameNo} undoClicks={undoClick} gameStarted={gameStarted}  score1={score1}  score2={score2} startGame={()=>{if(score1==2 || score2==2){setCells(getInitialCells) ; setWinner(CellPlayer.None);setGameStarted(false);setGameNo(1);setPlayer1Turn(Math.random() >= 0.5);setScore1(0);setScore2(0);}else{setGameStarted(true)}}}/>
            <Board
                cells={cells}
                handleClick={handleClick}
                gameStarted={gameStarted}
                
            />
        </div>
    )
}

export default Game;