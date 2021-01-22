import React, { useEffect, useState } from "react";
import { Move } from "../Move/Move";
import { compare } from "../Move/Components/compare";
import { piece } from "./img/pieces";

import { pieces } from "./defs";

function CSquare(props) {

  const prediction =
    props.predictBoard[props.i][props.j] === "x" ? "predict" : "";

  const color = props.element 
    ? props.element[0] === props.element.toUpperCase()
      ? "White"
      : "black"
    : "";

  const colorSelect =
    props.selected[1] === props.i && props.selected[2] === props.j
      ? "selected"
      : "";

  const empty = (e) => {
    if (props.gameBoard[props.i][props.j] && color === props.turn) {
      props.setSelected([
        props.gameBoard[props.i][props.j],
        props.i,
        props.j,
        color,

        console.log("index Start:",props.i),
        console.log("element:",props.element)

      ]);
      props.setTempPiece([
        props.gameBoard[props.i][props.j],
        props.i,
        props.j,
        color
      ]);

 



      const tempPredict = props.initial.map((a) => [...a]);
      props.setPredictBoard(
        Move(
          [props.gameBoard[props.i][props.j], props.i, props.j, color],
          props.i,
          props.j,
          tempPredict,
          props.gameBoard
        )
      );
    }
  };

  const notEmpty = (e) => {
    if (props.selected[3] === color) {
      props.setSelected([
        props.gameBoard[props.i][props.j],
        props.i,
        props.j,
        color
      ]);
      props.setTempPiece([
        props.gameBoard[props.i][props.j],
        props.i,
        props.j,
        color
      ]);
      const tempPredict = props.initial.map((a) => [...a]);
      props.setPredictBoard(
        Move(
          [props.gameBoard[props.i][props.j], props.i, props.j, color],
          props.i,
          props.j,
          tempPredict,
          props.gameBoard,
        )
      );
    }

    if (
      compare(props.selected[0]) !==
        compare(props.gameBoard[props.i][props.j]) &&
      props.predictBoard[props.i][props.j] === "x"
    ) {
      const tempBoard = props.gameBoard.map((a) => [...a]);
      tempBoard[props.i].splice(props.j, 1, props.selected[0]);
      tempBoard[props.selected[1]].splice(props.selected[2], 1, undefined);
      props.setGameBoard(tempBoard);
      props.setSelected([]);
      props.setPredictBoard(props.initial);
      props.setTurn(props.turn === "White" ? "black" : "White");
    }
    if (!props.gameBoard[props.i][props.j]) {
      props.setSelected([]);
      props.setPredictBoard(props.initial);

      //MOVED TOO INDEX///////////////////////
      console.log("index Moved Too:",props.i)

      // CREATE QUEEN///////////////////////////////////////////////
      // 1. Piece === Pawn
      // 2. Create Queen

      // if(props.i === 4 && props.turn === "White"){
      if(props.i === 4 && props.turn === "White" && pieces.w[1][0][props.j]) {        
        console.log('create Q White')
        console.log('pieces:', pieces.w[1][0][props.j])
        console.log('piece Q:',pieces.wq[0][0][props.j])
        console.log('element:', props.element)
        props.setAddW(props.addW + 1); 

        props.setGameBoard(props.createQueen)
        // props.playboard.push(0)
        // props.setGameBoard(props.createQueen);
        // props.element = pieces.wq[1][0][props.j]
      }

      if(props.i === 3 && props.turn !== "White"){
        console.log('create Q Black')
        props.setAddB(props.addB + 1);
      }
    }


  };


  const clickHandler = (e) => {
    props.selected.length === 0 ? empty(e) : notEmpty(e);
    // props.setAdd(props.add + 1); 
  };

  const pceLoop = (e, j) => {
    for (let i = 0; 0 < piece.length; i++) {
      if (piece[i].id === e + j) {
        return piece[i].src;
      }
    }
  };

  const pce = props.element ? pceLoop(color[0], props.element) : "";

  return (
    <div
      className={`${props.type1} ${color} ${colorSelect}  `}
      onClick={(e) => {
        clickHandler(e);
      }}
    >
      {/* {props.element} */}
      <div className={`${prediction}`}>
        {prediction === "predict" ? (
          props.element ? (
            <div className="circle" />
          ) : (
            <div className="dot" />
          )
        ) : (
          ""
        )}
      </div>
      {/* {props.element} */}
      {props.element ? (
        <img className="piece" src={require(`${pce}`)} alt={props.element} />
      ) : (
        ""
      )}
    </div>
  );
};

export default CSquare;