import React, { useEffect, useState } from "react";
import { Move } from "../Move/Move";
import { compare } from "../Move/Components/compare";
import { piece } from "./img/pieces";

import { pieces } from "./defs";

function MySquare(props) {

  const prediction =
    props.predictBoard2[props.i][props.j] === "x" ? "predict" : "";

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
    if (props.gameBoard2[props.i][props.j] && color === props.turn) {
      props.setSelected([
        props.gameBoard2[props.i][props.j],
        props.i,
        props.j,
        color,

        console.log("index Start:",props.i),
        console.log("element:",props.element)

      ]);
      props.setTempPiece([
        props.gameBoard2[props.i][props.j],
        props.i,
        props.j,
        color
      ]);

 



      const tempPredict = props.initial.map((a) => [...a]);
      props.setPredictBoard2(
        Move(
          [props.gameBoard2[props.i][props.j], props.i, props.j, color],
          props.i,
          props.j,
          tempPredict,
          props.gameBoard2
        )
      );
    }
  };

  const notEmpty = (e) => {
    if (props.selected[3] === color) {
      props.setSelected([
        props.gameBoard2[props.i][props.j],
        props.i,
        props.j,
        color
      ]);
      props.setTempPiece([
        props.gameBoard2[props.i][props.j],
        props.i,
        props.j,
        color
      ]);
      const tempPredict = props.initial.map((a) => [...a]);
      props.setPredictBoard2(
        Move(
          [props.gameBoard2[props.i][props.j], props.i, props.j, color],
          props.i,
          props.j,
          tempPredict,
          props.gameBoard2,
        )
      );
    }

    if (
      compare(props.selected[0]) !==
        compare(props.gameBoard2[props.i][props.j]) &&
      props.predictBoard2[props.i][props.j] === "x"
    ) {
      const tempBoard = props.gameBoard2.map((a) => [...a]);
      tempBoard[props.i].splice(props.j, 1, props.selected[0]);
      tempBoard[props.selected[1]].splice(props.selected[2], 1, undefined);
      props.setGameBoard2(tempBoard);
      props.setSelected([]);
      props.setPredictBoard2(props.initial);
      props.setTurn(props.turn === "White" ? "black" : "White");
    }
    if (!props.gameBoard2[props.i][props.j]) {
      props.setSelected([]);
      props.setPredictBoard2(props.initial);

      //MOVED TOO INDEX///////////////////////
      console.log("index Moved Too:",props.i)

    
      if(props.i === 0 && props.turn === "White" && pieces.w[1][0][props.j]) {        
        console.log('create Q White')
        console.log('pieces:', pieces.w[1][0][props.j])
        console.log('piece Q:',pieces.wq[0][0][props.j])
        console.log('element:', props.element)
        props.setAddW(props.addW + 1); 
      }

      if(props.i === 5 && props.turn !== "White"){
        console.log('create Q Black')
        props.setAddB(props.addB + 1);
      }
    }


  };


  const clickHandler = (e) => {
    props.selected.length === 0 ? empty(e) : notEmpty(e);
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

export default MySquare;