import React from "react";
// import ReactDOM from "react-dom";
import Board2 from "./components/Board2";

// import Board from "./components/Board";
import RemovedPieces from "./components/RemovedPieces";
import Title from "./components/Title";
import "./styles.css";

const ChessPieces = require("./chessPieces.js");
const PieceLogic = require("./chessPieceLogic.js");
const BoardHelperFuncs = require("./boardHelperFunctions.js");

function ChessGame(props) {

    numOfRows = 8;
    numOfCols = 8;

    state = {
      // array of all board states at a certain period of game
      history: [
        {
          board: BoardHelperFuncs.getStartBoard(
            ChessPieces.allWhitePieces,
            ChessPieces.allBlackPieces
          )
        }
      ],
      // index for which board state of history should be displayed
      historyIndex: 0,
      // possible moves possible for selected piece
      possibleMoves: [],
      // keeps track of currently selected piece index
      selectedPieceRow: null,
      selectedPieceCol: null,
      // keeps track of which player's turn it is (white:0,black:1)
      turnColor: 0,
      // keeps track of which player has won (-1 if no winner, 0 for white, 1 for black)
      winner: -1,
      // keeps track of all piecs in play (index 0 for white, index 1 for black)
      piecesInPlay: [ChessPieces.allWhitePieces, ChessPieces.allBlackPieces],
      // keeps track of all pieces off play (index 0 for white, index 1 for black)
      piecesOffPlay: [[], []]
    };
//   }

  /* helper function for squareClicked() to check if player has clicked 
  among possible moves */
  function pickedPossibleMove(row, col) {
    for (const index in state.possibleMoves) {
      const move = state.possibleMoves[index];
      if (row === move[0] && col === move[1]) return true;
    }
    return false;
  }

  // helper function to give opposite color (0 for white, 1 for black)
  function oppositeColor(color) {
    if (color === 0) return 1;
    return 0;
  }s
  // move piece to another square
  function squareClicked(row, col) {
    const board = state.history[state.historyIndex].board;
    const piece = board[row][col];

    // code for player to select a piece to move
    if (!pickedPossibleMove(row, col)) {
      /* return if box without pieces has been clicked or player color does
      not match chosen piece's color or if game has been won*/
      if (
        !piece ||
        state.turnColor !== piece.color ||
        state.winner !== -1
      ) {
        return;
      }

      // create a list of possible moves for the piece
      let opponentPieces = state.piecesInPlay[
        oppositeColor(state.turnColor)
      ];
      let king = ChessPieces.kings[state.turnColor];
      let possibleMoves = piece.possibleMoves(board, opponentPieces, king);
      possibleMoves = piece.filterMovesResultingInCheck(
        possibleMoves,
        opponentPieces,
        board,
        king
      );

      setState({
        possibleMoves: possibleMoves,
        selectedPieceRow: row,
        selectedPieceCol: col
      });
    }

    // code for player to move selected piece
    else {
      const possibleMoves = this.state.possibleMoves;

      // return if player does not choose among possible moves
      for (const index in possibleMoves) {
        const move = possibleMoves[index];

        if (BoardHelperFuncs.moveMatchesIndex(move, row, col)) {
          // updated version of board
          let newBoard = BoardHelperFuncs.copyOfBoard(board);
          newBoard = updateBoard(
            newBoard,
            state.selectedPieceRow,
            state.selectedPieceCol,
            row,
            col
          );
          // updated version of history
          const history = updateHistory(newBoard);

          this.setState(
            {
              history: history,
              historyIndex: state.historyIndex + 1,
              possibleMoves: [],
              turnColor: oppositeColor(turnColor)
            },
            () =>
              updateGameStatus(
                state.history[state.historyIndex].board
              )
          );

          break;
        }
      }
      return;
    }
  }

  // move chess piece
  function updateBoard(board, oldRow, oldCol, newRow, newCol) {
    // piece to move
    const pieceToMove = board[oldRow][oldCol];

    removeOpponentPiece(board, newRow, newCol);

    // transfer piece
    board[newRow][newCol] = pieceToMove;
    board[oldRow][oldCol] = null;

    // update pieceToMove's attributes
    pieceToMove.updateIndex(newRow, newCol);
    pieceToMove.hasBeenMoved();

    return board;
  }

  // helper function for updateBoard() to remove opponent piece from board
  function removeOpponentPiece(board, row, col) {
    // if there was an opponent's piece at new index, get rid of that piece from board
    const opponentPiece = board[row][col];
    if (opponentPiece === null) return;

    // create copies of piecesInPlay and piecesOffPlay
    let piecesInPlay = BoardHelperFuncs.copyOfBoard(state.piecesInPlay);
    let piecesOffPlay = BoardHelperFuncs.copyOfBoard(state.piecesOffPlay);

    const opponentPieceColor = opponentPiece.color;
    // update opponent pieces in play
    piecesInPlay[opponentPieceColor] = piecesInPlay[opponentPieceColor].filter(
      function (piece) {
        return piece !== opponentPiece;
      }
    );

    // update opponent pieces off play
    piecesOffPlay[opponentPieceColor].push(opponentPiece);

    setState({ piecesInPlay: piecesInPlay, piecesOffPlay: piecesOffPlay });
  }

  // helper function to add currentBoard to the history array
  function updateHistory(board) {
    /* add current board to history and increment history index
     *** if historyIndex is less than historyLength-1, it 
     means that a move has been played after the user has 
     used the jump backwards button. Therefore, all elements in history after
     where historyIndex currently is should be erased *** 
     */
    const historyIndex = state.historyIndex;
    const historyLength = state.history.length;
    let history = state.history;
    if (historyIndex < historyLength - 1) {
      history = state.history.splice(0, historyIndex + 1);
    }

    return history.concat([{ board: board }]);
  }

  // helper function to check for wins (0 for white win, 1 for black)
  function updateGameStatus(board) {
    let winner = -1;
    // white checkmated
    if (
      PieceLogic.Piece.isKingInCheckmate(
        board,
        piecesInPlay[0],
        piecesInPlay[1],
        ChessPieces.kings[0],
        board
      )
    ) {
      winner = 1;
    }
    // black checkmated
    else if (
      PieceLogic.Piece.isKingInCheckmate(
        board,
        state.piecesInPlay[1],
        state.piecesInPlay[0],
        ChessPieces.kings[1]
      )
    ) {
      winner = 0;
    }

    setState({ winner: winner });
  }

//   render() {

    // get current board state which should be displayed
    const board = history[historyIndex].board;

    return (
      <div className="game">
        <Title turnColor={turnColor} winner={winner} />
        <div className="board-container">
          <RemovedPieces
            className="whiteRemovedPieces"
            pieces={piecesOffPlay[0]}
          />
          <Board2
            board={board}
            squareClicked={(row, col) => squareClicked(row, col)}
            possibleMoves={possibleMoves}
          />

          <RemovedPieces
            className="blackRemovedPieces"
            pieces={state.piecesOffPlay[1]}
          />
        </div>
      </div>
    );
//   }
}

export default ChessGame;