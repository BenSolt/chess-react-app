import React, { useState } from "react";

function Square(props) {

  // const [addB, setAddB] = useState(0);
  const prediction =
  props.predictBoard[props.i][props.j] === "x" ? "predict" : "";

  
  return (
    <div
      className={props.type}

      onClick={(e) => {
        if (props.selected.length === 0) {
          if (
            props.gameBoard[props.i][props.j] &&
            props.gameBoard[props.i][props.j] !== 100 &&
            props.gameBoard[props.i][props.j] === props.ind
            // document.getElementById('Pawn') 
          ) {
            props.setSelected([
              props.gameBoard[props.i][props.j],
              props.i,
              props.j,


            ]);
            console.log("clicked", props.i, props.j);
          }
        } else if (props.selected.length > 0) {
          console.log("moved", props.selected);
          if (
            !props.gameBoard[props.i][props.j] ||
            props.gameBoard[props.i][props.j] !== props.selected[0]
          ) {
            let newGameBoard = [...props.gameBoard];
            newGameBoard[props.i].splice(props.j, 1, props.selected[0]);
            newGameBoard[props.selected[1]][props.selected[2]] = "";
            props.setGameBoard(...[newGameBoard]);
            props.setSelected([]);
          }
          if (
            props.gameBoard[props.i][props.j] === props.gameBoard[0][props.j] &&
            props.gameBoard[0][props.j] !== 100
          ) {

            console.log("queen", props.i, props.j);

          }
        }
        // console.log(!props.gameBoard[props.i][props.j]);
        
      }}
    >
      {/* <div className={`${prediction}`}>
          {prediction === "predict" ? (
            props.element ? (
              <div className="circle" />
            ) : (
                <div className="dot" />
              )
          ) : (
              ""
            )}
      </div>       */}

      {props.ind}
          <div className='square'>
            {props.ind2}
          </div>


        </div>
  );
      };

      export default Square