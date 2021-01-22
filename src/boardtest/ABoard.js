import React, { useState } from "react";
import Square from "./ASquare";

function ABoard(props) {
  const [selected, setSelected] = useState([]);
  // const [add, setAdd] = useState(0);


  const [gameBoard, setGameBoard] = useState(
    new Array(8).fill(new Array(8).fill("")).map((e, i) => {
      return e.map((a, j) => {
        if (i === 1 && j === 0) {
          // return (a = "A");
          return a = <div id='Pawn' className="pawnBlack">PB</div>;
        } else if (i === 7 && j === 7) {
          // return (a = "B");
          return a = <div id='Pawn' className="pawnWhite">PW</div>;
        }
        if (i === 0 && j === 0) {
          return a = <div id='Queen' className="QueenWhite">QW</div>;
        }
      });
    })
  );


  const [predictBoard, setPredictBoard] = useState(
    new Array(8).fill(new Array(8).fill("")).map((e, i) => {
      return e.map((a, j) => {
        return "o";
      });
    }) )
    

  return (
    <div className='container'>
      {/* <div className='text'>A{add}</div> */}
      <div>
        {gameBoard.map((e, i) => {
          return (
            <div className="board-row">
              {e.map((a, j) => {
                let type;
                i % 2 === 0
                  ? j % 2 === 1
                    ? (type = "square light")
                    : (type = "square dark")
                  : j % 2 === 0
                    ? (type = "square light")
                    : (type = "square dark");
                return (
                  <Square
                    type={type}
                    selected={selected}
                    setSelected={setSelected}
                    gameBoard={gameBoard}
                    setGameBoard={setGameBoard}
                    predictBoard={predictBoard}
                    setPredictBoard={setPredictBoard}
                    i={i}
                    j={j}
                    ind={a}
                  // ind2={b}
                  />
                  // <Unit/>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ABoard;