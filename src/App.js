import { useState } from 'react';
import Cell from './components/Cell/Cell';
import WinnerPlayer from './components/WinnerPlayer/WinnerPlayer';
import WinCount from './components/WinnerPlayer/WinCount';
import './App.css';

const possibleWins = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];
function App() {
  const [winCount, setWinCount] = useState({x:0,o:0});
  const [winArrayX, setWinArrayX] = useState([]);
  const [winArrayY, setWinArrayY] = useState([]);
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [gameArray, setGameArray] = useState(Array(9).fill(null));

  // GAME HANDLER
  const gameHandler = (cellNum) => {
    const cloneArray = gameArray.slice();
    cloneArray[cellNum] = isPlayerX ? 'X' : 'O';
    setIsPlayerX(!isPlayerX);
    setGameArray(cloneArray);
    if (isPlayerX){
      historyForX(cellNum);
    }else{
      historyForY(cellNum);
    }
  }

  // COLLECTING THE HISTORY OF 'x'
  const historyForX = (cellNum) => {
    setWinArrayX((prevwinArrayX) => {
      const newArrayX = [cellNum, ...prevwinArrayX];
      // console.log('Array X =>',newArrayX);
      if(newArrayX.length >= 3){
        findWinnerHnadler(newArrayX);
      }
      return newArrayX;
    });
    
  };

  // COLLECTING THE HISTORY OF 'O'
  const historyForY = (cellNum) => {
    setWinArrayY((prevwinArrayY) => {
      const newArrayY = [cellNum, ...prevwinArrayY];
      if(newArrayY.length >= 3){
        findWinnerHnadler(newArrayY);
      }
      // console.log('Array Y =>',newArrayY);
      return newArrayY;
    });    
  };
  

  // FINDING THE WINNER
  const findWinnerHnadler = (winChan) => {
    for (let index = 0; index < possibleWins.length; index++) {
      const winner = possibleWins[index].every(item => winChan.includes(item));
      if(winner){
        if(isPlayerX){
          setWinCount({x:winCount.x + 1, o:winCount.o});
          resetGame();
          // console.log('X => ',xWins, 'COM => ', possibleWins[index].toString(), 'COM WITH => ', winChan.sort().toString());
        }else{
          setWinCount({x:winCount.x, o:winCount.o + 1});
          resetGame();
          // console.log('Y => ',yWins, 'COM => ', possibleWins[index].toString(), 'COM WITH => ', winChan.sort().toString());
        }
      }
    }
  }

  const resetGame = () => {
    setGameArray(Array(9).fill(null));
    setIsPlayerX(true);
    setWinArrayX([]);
    setWinArrayY([]);
  }
  return (
    <div className="App">
      <WinnerPlayer  value={isPlayerX ? 'X' : 'O'} />
      <div className='tikTakToe'>
        {(() => {
          let cell = [];
          for (let i = 0; i < 9; i++) {
            cell.push(<div className='cell' onClick={() => gameHandler(i)} key={i}><Cell value={i} >{gameArray[i]}</Cell></div>);
          }
          return cell;
        })()}
      </div>
      <WinCount count={winCount} />
      <div onClick={resetGame}>Reset</div>
    </div>
  );
}

export default App;
