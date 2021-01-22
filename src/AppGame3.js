import React from "react";
import Board from "./components3/Board/Board";

import MyBoard from "./components3/Board/MyBoard";
import "./AppGame3.css";


export default function AppGame() {
  return (
    <div className="App">
      <Board/>
      <MyBoard/>
    </div>
  );
}