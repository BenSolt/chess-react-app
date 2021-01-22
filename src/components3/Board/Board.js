import React, { useState, useEffect } from "react";
import Square from "./Square";
import { pieces } from "./defs";
import { piece } from "./img/pieces";


function Board(props) {

  const [addW, setAddW] = useState(0);
  const [addB, setAddB] = useState(0);

  var playboard = [
    0, 0, 0, 0, 0, 0, 0, 0,
  ]


  const [tempPiece, setTempPiece] = useState([]);
  const [turn, setTurn] = useState("White");
  const [selected, setSelected] = useState([]);
  const [predictBoard, setPredictBoard] = useState(
    playboard.fill(playboard.fill("")).map((e, i) => {
      // new Array(8).fill(new Array(8).fill("")).map((e, i) => {
      return e.map((a, j) => {
        return "o";
      });
    })
  );


  const [gameBoard, setGameBoard] = useState(
    playboard.fill(playboard.fill("")).map((e, i) => {
      return e.map((a, j) => {
        if (i === 0) {
          return (a = pieces.b[0][0][j]);
        } else if (i === 1) {
          return (a = pieces.b[1][0][j]);
          // } else if (i === 2) {
          //   return (a = pieces.bq[1][0][j]);
        } else if (i === 6) {
          return (a = pieces.w[1][0][j]);
        } else if (i === 7) {
          return (a = pieces.w[0][0][j]);

          // } else if (i === 4) {
          //   return (a = pieces.wq[1][0][j]);
        }

      
        

        return undefined;
      });
    })
  );

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////


  const [createQueen, setCreateQueen] = useState(
    playboard.fill(playboard.fill("")).map((e, i) => {
      return e.map((a, j) => { 
        if (i === 4) {
          return (a = pieces.wq[1][0][j]);
        } 
      })}
    )
    )
    
    
  
  

  // const [createQueen, setCreateQueen] = useState(
  //   playboard.fill(playboard.fill("")).map((e, i) => {
  //   // playboard.push(playboard.push("")).map((e,i) => {
  //     return e.map((a, j) => {
  //       if (i === 0) {
  //       } else if (i === 3) {
  //         return (a = pieces.bq[1][0][j]);

  //       } else if (i === 4) {
         
  //         return (a = pieces.wq[1][0][j]);
  //       }
  //       return undefined;
  //     });
  //   })
  // );


  const initial = playboard.fill(playboard.fill("")).map((e, i) => {
    return e.map((a, j) => {
      return "o";
    });
  });

  // const pceLoop = (e, j) => {
  //   for (let i = 0; 0 < piece.length; i++) {
  //     if (piece[i].id === e + j) {
  //       return piece[i].src;
  //     }
  //   }
  // };

  // const move = (e) => {
  //   e.target.style.transform = "translate(0,-150px)";
  // };

  // const pce = selected.length > 1 ? pceLoop(selected[3][0], selected[0]) : "";
  return (
    <div className='container'>
      <div className="board">
        {gameBoard.map((e, i) => {
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
                  <Square
                    key={`${i},${j}`}
                    type1={type}
                    selected={selected}
                    setSelected={setSelected}
                    gameBoard={gameBoard}
                    setGameBoard={setGameBoard}
                    predictBoard={predictBoard}
                    setPredictBoard={setPredictBoard}
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

export default Board;
