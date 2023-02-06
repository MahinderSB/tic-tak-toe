import { useState } from 'react';
import Cell from './components/Cell/Cell';
import WinnerPlayer from './components/WinnerPlayer/WinnerPlayer';
import './App.css';

function App() {
  const [winCount, setWinCount] = useState({x:0,o:0});
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [gameArray, setGameArray] = useState(Array(9).fill(null));

  const gameHandler = (cellNum) => {
    const cloneArray = gameArray.slice();
    cloneArray[cellNum] = isPlayerX ? 'X' : 'O';
    setIsPlayerX(!isPlayerX);
    setGameArray(cloneArray);
  }

  return (
    <div className="App">
      <WinnerPlayer value={isPlayerX ? 'X' : 'O'} />
      <div className='tikTakToe'>
        {(() => {
          let cell = [];
          for (let i = 0; i < 9; i++) {
            cell.push(<div className='cell' onClick={() => gameHandler(i)} key={i}><Cell value={i} >{gameArray[i]}</Cell></div>);
          }
          return cell;
        })()}
      </div>

    </div>
  );
}

export default App;
