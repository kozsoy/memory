import { useEffect, useState } from 'react';
import { Aliance, Christmas, Droid, Empire, Favorite, Sparkle, Star, Trophy } from './icons';
import './App.css';
import shuffle from './utils/shuffle';

const iconList = [Aliance, Christmas, Droid, Empire, Favorite, Sparkle, Star, Trophy]

function App() {
  const [data, setData] = useState([]);
  const [openData, setOpenData] = useState([]);
  const [point, setPoint] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const start = () => {
    setPoint(100);
    setOpenData([]);
    setIsWin(false);

    let newList = [];
    let iconNumber = 0;

    for(let i = 0; i < 16; i++) {
      newList.push({
        name: iconList[iconNumber].name,
        icon: iconList[iconNumber],
        isOpen: false,
        status: false
      });

      if(i % 2 === 1) {
        iconNumber++;
      }
    }

    newList = shuffle(newList);
    setData(newList);
  }

  useEffect(() => {
    start();
  }, []);

  const open = id => {
    let newData = [...data];
    let newOpenData = [...openData];

    if(newOpenData.length >= 2) {
      newOpenData = [];

      newData.map(item => {
        if(item.status) {
          item.isOpen = true;
        }
        else {
          item.isOpen = false;
        }
      });
    }
  
    newOpenData.push(newData[id]);
    setOpenData(newOpenData);

    if(newOpenData.length === 2) {
      if(newOpenData[0].name === newOpenData[1].name) {
        newData.map(item => {
          if(item.name === newOpenData[0].name) {
            item.status = true;
          }
        });
      }
    }

    newData[id].isOpen = true;
    setData(newData);
    setPoint(x => x - 1);
  }

  useEffect(() => {
    let count = 0;
    data.forEach(item => {
      if(item.status) {
        count++;
      }
    });

    setIsWin(false);

    if(count > 15) {
      setIsWin(true);
    }
  }, [point])

  return (
    <div className='Container'>
      <div>Point {point}</div>
      <div className="App">
        {
          data.map((Item, index) => 
            <div key={index} className={
              Item.status ? 'Box Win ' : Item.isOpen ? 'Box Open' : 'Box'
              }
              onClick={() => open(index)}>
              {
                Item.isOpen &&
                <Item.icon size="42" color="#fff" />
              }
            </div>
          )
        }
      </div>
      {
        point < 1 && 
        <div className='gameOverContent'>
          <div className='gameOver' onClick={start}>
            GAME OVER
          </div>
        </div>
      }
      {
        isWin && 
        <div className='gameOverContent'>
          <div className='gameOver' onClick={start}>
            YOU WIN
          </div>
        </div>
      }
    </div>
  );
}

export default App;
