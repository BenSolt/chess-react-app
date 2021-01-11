import React from "react";
import ReactDOM from "react-dom";
import Square from "./Square";

import "./board.css";

function Board2(props) {

    function renderSquare(row, col) {
        // determine whether square should be colored or not
        let colorClassName = "light";
        if ((row + col) % 2 === 1) {
            colorClassName = "dark";
        }
        // mark squares to be highlighted
        let highlightClassName = "";
        const possibleMoves = props.possibleMoves;
        for (const index in possibleMoves) {
            const move = possibleMoves[index];
            if (move[0] === row && move[1] === col) highlightClassName = "highlight";
        }

        return (
            <Square
                colorClassName={colorClassName}
                highlightClassName={highlightClassName}
                value={props.board[row][col]}
                onClick={() => props.squareClicked(row, col)}
            />
        );
    }

    function renderRow(row) {
        return (
            <div className="row">
                {renderSquare(row, 0)}
                {renderSquare(row, 1)}
                {renderSquare(row, 2)}
                {renderSquare(row, 3)}
                {renderSquare(row, 4)}
                {renderSquare(row, 5)}
                {renderSquare(row, 6)}
                {renderSquare(row, 7)}
            </div>
        );
    }

    return (

        <div className="board">
            {renderRow(0)}
            {renderRow(1)}
            {renderRow(2)}
            {renderRow(3)}
            {renderRow(4)}
            {renderRow(5)}
            {renderRow(6)}
            {renderRow(7)}
        </div>
    )
}
export default Board2;