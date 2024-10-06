import GameBoard from "./components/gameBoard";
import Log from "./components/Log";
import Player from "./components/Player"
import GameOver from "./components/GameOver";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = 'X' ;
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    activePlayer = 'O';
  }
  return activePlayer;
}

function getWinner(gameBoard, players){
  let winner;
  for (const combination of WINNING_COMBINATIONS){
    const fisrtSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    
    if(fisrtSquareSymbol &&
      fisrtSquareSymbol === secondSquareSymbol &&
      fisrtSquareSymbol === thirdSquareSymbol
    ){
      winner = players[fisrtSquareSymbol];
    }
  }
  return winner;
}

function getGameBoard(gameTurns){
  let gameBoard =[...initalGameBoard.map((arr) => [...arr])];
  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X :"Player 1",
    O :"Player 2"
  });
  
  function restart() {
    setGameTurns([])
  }

  function handleSelectSquare(rowIndex, colIndex ) {
    setGameTurns( (preTurns => {
      const currentPlayer = deriveActivePlayer(preTurns);
      const updatedTurns = [ {square: {row :rowIndex , col: colIndex }, player: currentPlayer },
        ...preTurns]
        return updatedTurns;
    }))
  }
  function handlePlayerNameChange(symbol, newName){
    setPlayers( prevPlayers =>{
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  const activePlayer = deriveActivePlayer(gameTurns)
  const gameBoard = getGameBoard(gameTurns) ;
  const winner = getWinner(gameBoard, players)
  const hasDraw = gameBoard.length === 9 && !winner;
  return (
    <main>
      <div id='game-container'>
        <ol id="players" className="highlight-player">
          <Player initialName='Player 1' symbol="X" isActive={activePlayer === 'X'} onNameChange ={handlePlayerNameChange}/>
          <Player initialName='Player 2' symbol="O" isActive={activePlayer === 'O'} onNameChange ={handlePlayerNameChange}/>
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} restart ={restart}/>}
        <GameBoard onSelectSquare= {handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} players={players}/>
    </main>
  )
}

export default App
