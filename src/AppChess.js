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

class ChessGame1 extends React.Component {
  constructor(props) {
    super(props);
    // dimensions of chess board
    this.numOfRows = 8;
    this.numOfCols = 8;

    this.state = {
      // array of all board states at a certain period of game
      history: [
        {
          board: BoardHelperFuncs.getStartBoard(
            ChessPieces.allWhitePieces,
            ChessPieces.allBlackPieces,
            // ChessPieces.createQueen
          ),

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
      piecesOffPlay: [[], []],

      add: 0,
     

    };
  }

  /* helper function for squareClicked() to check if player has clicked 
  among possible moves */
  pickedPossibleMove(row, col) {
    for (const index in this.state.possibleMoves) {
      const move = this.state.possibleMoves[index];
      if (row === move[0] && col === move[1]) return true;
    }
    return false;
  }

  // helper function to give opposite color (0 for white, 1 for black)
  oppositeColor(color) {
    if (color === 0) return 1;
    return 0;
  }
  // move piece to another square
  squareClicked(row, col) {
    const board = this.state.history[this.state.historyIndex].board;
    const piece = board[row][col];

    // code for player to select a piece to move
    if (!this.pickedPossibleMove(row, col)) {
      /* return if box without pieces has been clicked or player color does
      not match chosen piece's color or if game has been won*/
      if (
        !piece ||
        this.state.turnColor !== piece.color ||
        this.state.winner !== -1
      ) {
        return;
      }

      // create a list of possible moves for the piece
      let opponentPieces = this.state.piecesInPlay[
        this.oppositeColor(this.state.turnColor)
      ];
      let king = ChessPieces.kings[this.state.turnColor];
      let possibleMoves = piece.possibleMoves(board, opponentPieces, king);
      possibleMoves = piece.filterMovesResultingInCheck(
        possibleMoves,
        opponentPieces,
        board,
        king
      );

      this.setState({
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
         
          newBoard = this.updateBoard(
            newBoard,
            this.state.selectedPieceRow,
            this.state.selectedPieceCol,
            row,
            col,
            //////////////////////////////////////////
            //////////////////////////////////////////
            //////////////////////////////////////////
            //////////////////////////////////////////
            this.setState({ add: this.state.add + 1}),
            
            /////////////////////////////////////////
            //////////////////////////////////////////
            //////////////////////////////////////////
            //////////////////////////////////////////
          );
          // updated version of history
          const history = this.updateHistory(newBoard);

          this.setState(
            {
              history: history,
              historyIndex: this.state.historyIndex + 1,
              possibleMoves: [],
              turnColor: this.oppositeColor(this.state.turnColor)
            },
            () =>
              this.updateGameStatus(
                this.state.history[this.state.historyIndex].board
              )
          );

          break;
        }
      }
      return;
    }
  }

  // move chess piece
  updateBoard(board, oldRow, oldCol, newRow, newCol) {
    // piece to move
    const pieceToMove = board[oldRow][oldCol];
    
    this.removeOpponentPiece(board, newRow, newCol);

    // transfer piece
    board[newRow][newCol] = pieceToMove;
    board[oldRow][oldCol] = null;
    

    // update pieceToMove's attributes
    pieceToMove.updateIndex(newRow, newCol);
    pieceToMove.hasBeenMoved();

    return board;
  }

  // helper function for updateBoard() to remove opponent piece from board
  removeOpponentPiece(board, row, col) {
    // if there was an opponent's piece at new index, get rid of that piece from board
    const opponentPiece = board[row][col];
    if (opponentPiece === null) return;

    // create copies of piecesInPlay and piecesOffPlay
    let piecesInPlay = BoardHelperFuncs.copyOfBoard(this.state.piecesInPlay);
    let piecesOffPlay = BoardHelperFuncs.copyOfBoard(this.state.piecesOffPlay);

    const opponentPieceColor = opponentPiece.color;
    // update opponent pieces in play
    piecesInPlay[opponentPieceColor] = piecesInPlay[opponentPieceColor].filter(
      function (piece) {
        return (piece !== opponentPiece,
        /////////////////////////////////
        /////////////////////////////////
        /////////////////////////////////
        console.log('remove'))
        /////////////////////////////////
        /////////////////////////////////
        /////////////////////////////////
      }
    );

    // update opponent pieces off play
    piecesOffPlay[opponentPieceColor].push(opponentPiece);

    this.setState({ piecesInPlay: piecesInPlay, piecesOffPlay: piecesOffPlay });
  }

  // helper function to add currentBoard to the history array
  updateHistory(board) {
    /* add current board to history and increment history index
     *** if historyIndex is less than historyLength-1, it 
     means that a move has been played after the user has 
     used the jump backwards button. Therefore, all elements in history after
     where historyIndex currently is should be erased *** 
     */
    const historyIndex = this.state.historyIndex;
    const historyLength = this.state.history.length;
    let history = this.state.history;
    if (historyIndex < historyLength - 1) {
      history = this.state.history.splice(0, historyIndex + 1);
    }

    return history.concat([{ board: board }]);
  }

  // helper function to check for wins (0 for white win, 1 for black)
  updateGameStatus(board) {
    let winner = -1;
    // white checkmated
    if (
      PieceLogic.Piece.isKingInCheckmate(
        board,
        this.state.piecesInPlay[0],
        this.state.piecesInPlay[1],
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
        this.state.piecesInPlay[1],
        this.state.piecesInPlay[0],
        ChessPieces.kings[1]
      )
    ) {
      winner = 0;
    }

    this.setState({ winner: winner });
  }


  addQueen = () => {

    console.log('add')
    this.setState({ add: this.state.add + 1})

    // BoardHelperFuncs.getStartBoard(
    // ChessPieces.createQueen
    // )

    const board = this.state.history[this.state.historyIndex].board;
    this.removeOpponentPiece(board, 7, 0)
    // this.state.piecesInPlay[0],

  }





  render() {
    // get current board state which should be displayed
    const board = this.state.history[this.state.historyIndex].board;

    return (
      <div className="game">
        <Title turnColor={this.state.turnColor} winner={this.state.winner} />
        <div className="board-container">

          <RemovedPieces
            className="whiteRemovedPieces"
            pieces={this.state.piecesOffPlay[0]}
          />

          <div>
            <button onClick={this.addQueen}>CLICK</button>
            <p>{this.state.add}</p>
          </div>
          
          <Board2
            board={board}
            squareClicked={(row, col) => this.squareClicked(row, col)}
            possibleMoves={this.state.possibleMoves}
          />

          <RemovedPieces
            className="blackRemovedPieces"
            pieces={this.state.piecesOffPlay[1]}
          />
        </div>
      </div>
    );
  }
}

export default ChessGame1;

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Game />, rootElement);