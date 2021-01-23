import React, { useState, useEffect } from "react";
import MySquare from "./MySquare";
import { pieces } from "./defs";
import { piece } from "./img/pieces";


function MyBoard(props) {

  const [addW, setAddW] = useState(0);
  const [addB, setAddB] = useState(0);

  var playboard2 = [
    0, 0, 0, 0, 0, 0,
  ]


  const [tempPiece, setTempPiece] = useState([]);
  const [turn, setTurn] = useState("White");
  const [selected, setSelected] = useState([]);
  const [predictBoard2, setPredictBoard2] = useState(
    playboard2.fill(playboard2.fill("")).map((e, i) => {
      // new Array(8).fill(new Array(8).fill("")).map((e, i) => {
      return e.map((a, j) => {
        return "o";
      });
    })
  );


  const [gameBoard2, setGameBoard2] = useState(
    playboard2.fill(playboard2.fill("")).map((e, i) => {
      return e.map((a, j) => {
        if (i === 0) {
          return (a = pieces.bp[0][0][j]);
        // } else if (i === 1) {
        //   return (a = pieces.bp[1][0][j]);

        // } else if (i === 4) {
        //   return (a = pieces.wp[1][0][j]);
        } else if (i === 5) {
          return (a = pieces.wp[0][0][j]);

        }
        return undefined;
      });
    })
  );

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  const [createQueen, setCreateQueen] = useState(
    playboard2.fill(playboard2.fill("")).map((e, i) => {
      return e.map((a, j) => { 
        if (i === 4) {
          return (a = pieces.wq[1][0][j]);
        } 
      })}
    )
    )
    
    
  
  


  const initial = playboard2.fill(playboard2.fill("")).map((e, i) => {
    return e.map((a, j) => {
      return "o";
    });
  });


  return (
    <div className='container'>
      <div className="board">
        {gameBoard2.map((e, i) => {
          return (
            <div className="board-row" key={`row${i}`}>
              {e.map((a, j) => {
                let type;
                i % 2 === 0
                  ? j % 2 === 0
                    ? (type = "square light")
                    : (type = "square dark")
                  : j % 2 === 1
                    ? (type = "square light")
                    : (type = "square dark");
                return (
                  <MySquare
                    key={`${i},${j}`}
                    type1={type}
                    selected={selected}
                    setSelected={setSelected}
                    gameBoard2={gameBoard2}
                    setGameBoard2={setGameBoard2}
                    predictBoard2={predictBoard2}
                    setPredictBoard2={setPredictBoard2}
                    initial={initial}
                    i={i}
                    j={j}
                    element={a}
                    tempPiece={tempPiece}
                    setTempPiece={setTempPiece}
                    turn={turn}
                    setTurn={setTurn}

                    addW={addW}
                    setAddW={setAddW}
                    addB={addB}
                    setAddB={setAddB}

                    createQueen={createQueen}
                    setCreateQueen={setCreateQueen}

                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <h1 className='text'>{turn[0].toUpperCase() + turn.substr(1)}</h1>
      <h1 className='text'>White: {addW}</h1>
      <h1 className='text'>Black: {addB}</h1>
    </div>
  );
};

export default MyBoard;