import React from 'react';

import PawnImg from "./Images/ChessPawn.png" 
import PawnImg_W from "./Images/ChessPawn_W.png" 
import HorseImg from "./Images/ChessHorse.png" 
import HorseImg_W from "./Images/ChessHorse_W.png" 
import RookImg from "./Images/ChessRook.png" 
import RookImg_W from "./Images/ChessRook_W.png" 
import BishopImg from "./Images/ChessBishop.png" 
import BishopImg_W from "./Images/ChessBishop_W.png" 
import QueenImg from "./Images/ChessQueen.png"
import QueenImg_W from "./Images/ChessQueen_W.png"
import KingImg from "./Images/ChessKing.png" 
import KingImg_W from "./Images/ChessKing_W.png" 

const BoardHelperFuncs = require("./boardHelperFunctions.js");

class Piece {
  constructor(color, imgURL, row, col) {
    this.color = color;
    this.imgURL = imgURL;

    // coordinates on board
    this.row = row;
    this.col = col;
  }

  static get numOfRows() {
    return 8;
  }
  static get numOfCols() {
    return 8;
  }

  updateIndex(newRow, newCol) {
    this.row = newRow;
    this.col = newCol;
  }

  // function to update piece's features if piece has been moved
  hasBeenMoved() {}

  // checks whether king IS in check
  static isKingInCheck(king, opponentPieces, board) {
    for (let index in opponentPieces) {
      const opponentPiece = opponentPieces[index];
      // check whether king can be reached
      const possibleMoves = opponentPiece.possibleMoves(board);
      for (let i in possibleMoves) {
        const move = possibleMoves[i];
        if (king.row === move[0] && king.col === move[1]) return true;
      }
    }
    return false;
  }

  /* checks whether king is in checkmate 
  (if king in check and no possible moves exist that do not result in check) */
  static isKingInCheckmate(board, playerPieces, opponentPieces, king) {
    let possibleMoves = [];
    // add all possible moves by all player's pieces
    for (let index in playerPieces) {
      const playerPiece = playerPieces[index];
      let possibleMovesByPiece = playerPiece.possibleMoves(board);
      possibleMovesByPiece = playerPiece.filterMovesResultingInCheck(
        possibleMovesByPiece,
        opponentPieces,
        board,
        king
      );
      // console.log(playerPiece, possibleMovesByPiece);
      possibleMoves = possibleMoves.concat(possibleMovesByPiece);
    }

    return (
      Piece.isKingInCheck(king, opponentPieces, board) &&
      possibleMoves.length === 0
    );
  }
  // checks whether king WILL be in check after piece moves to new index
  willKingBeInCheck(opponentPieces, board, king, newRow, newCol) {
    // change position of piece
    // make copy of board
    const boardCopy = BoardHelperFuncs.copyOfBoard(board);

    // if there is a piece at new index, remove it from opponentPieces
    const pieceAtNewIndex = boardCopy[newRow][newCol];
    const opponentPiecesCopy = opponentPieces.filter(function(piece) {
      return piece !== pieceAtNewIndex;
    });

    // update boardCopy
    const oldRow = this.row;
    const oldCol = this.col;
    boardCopy[oldRow][oldCol] = null;
    boardCopy[newRow][newCol] = this;
    this.row = newRow;
    this.col = newCol;

    // check whether king would be in check
    const kingInCheck = Piece.isKingInCheck(
      king,
      opponentPiecesCopy,
      boardCopy
    );

    // change back index of piece
    this.row = oldRow;
    this.col = oldCol;

    return kingInCheck;
  }

  // filter possibleMoves to get rid of moves that would cause king to be in check
  filterMovesResultingInCheck(possibleMoves, opponentPieces, board, king) {
    return possibleMoves.filter(move => {
      return !this.willKingBeInCheck(
        opponentPieces,
        board,
        king,
        move[0],
        move[1]
      );
    });
  }

  // helper function for isMoveValid() to check if piece remains in index of board
  indexInRange(row, col) {
    return (
      row >= 0 && row < Piece.numOfRows && col >= 0 && col < Piece.numOfCols
    );
  }

  // helper function for isMoveValid() to check if there are pieces between start and end indices
  piecesBlockingMove(board, startRow, startCol, endRow, endCol) {
    // if startRow and endRow are the same, horizontal move
    if (startRow === endRow) {
      const distance = endCol - startCol;
      if (distance > 0) {
        for (let col = startCol + 1; col < endCol; col++) {
          if (board[startRow][col] !== null) {
            return true;
          }
        }
      } else {
        for (let col = endCol + 1; col < startCol; col++) {
          if (board[startRow][col] !== null) return true;
        }
      }
    }
    // if startCol and endCol are the same, vertical move
    else if (startCol === endCol) {
      const distance = endRow - startRow;
      if (distance > 0) {
        for (let row = startRow + 1; row < endRow; row++) {
          if (board[row][startCol] !== null) return true;
        }
      } else {
        for (let row = endRow + 1; row < startRow; row++) {
          if (board[row][startCol] !== null) return true;
        }
      }
    }

    // else diagonal move
    else {
      const horizDistance = endCol - startCol;
      const vertDistance = endRow - startRow;
      const diagonalDistance = Math.abs(horizDistance);
      // negative diagonal move if horizDistance and vertDistance have same sign
      if (horizDistance * vertDistance > 0) {
        if (horizDistance > 0) {
          for (let i = 1; i < diagonalDistance; i++) {
            if (board[startRow + i][startCol + i] !== null) return true;
          }
        } else {
          for (let i = 1; i < diagonalDistance; i++) {
            if (board[startRow - i][startCol - i] !== null) return true;
          }
        }
      }
      // positive diagonal move otherwise
      else {
        if (horizDistance > 0) {
          for (let i = 1; i < diagonalDistance; i++) {
            if (board[startRow - i][startCol + i] !== null) return true;
          }
        } else {
          for (let i = 1; i < diagonalDistance; i++) {
            if (board[startRow + i][startCol - i] !== null) return true;
          }
        }
      }
    }

    return false;
  }

  // helper function to determine what color piece is at index
  colorOfPiece(board, row, col) {
    const piece = board[row][col];
    if (piece === null) return null;
    return piece.color;
  }

  // helper function to determine if enemy is at index
  enemyAtIndex(board, row, col) {
    const colorAtIndex = this.colorOfPiece(board, row, col);
    if (colorAtIndex === this.color || colorAtIndex === null) return false;
    return true;
  }

  // is move valid?
  isValidMove(board, isKnight, startRow, startCol, endRow, endCol) {
    // check if end indices are in range
    if (!this.indexInRange(endRow, endCol)) {
      return false;
    }

    /* check if any pieces are between start and end indices; if knight,
        ignore this check*/
    if (
      !isKnight &&
      this.piecesBlockingMove(board, startRow, startCol, endRow, endCol)
    ) {
      return false;
    }

    // if piece at end index is same color, then move not possible

    if (this.colorOfPiece(board, endRow, endCol) === this.color) {
      return false;
    }
    return true;
  }
}

class King extends Piece {
  constructor(color, row, col) {
    let imgURL;
    // white img
    if (color === 0) {
      imgURL = KingImg_W;
    }
    // black img
    else {
      imgURL = KingImg;
    }

    super(color, imgURL, row, col);
  }

  // possible moves that king can make
  possibleMoves(board) {
    const currentRow = this.row;
    const currentCol = this.col;

    // 8 possible moves for king
    const possibleMoves = [];
    possibleMoves.push([currentRow - 1, currentCol]);
    possibleMoves.push([currentRow + 1, currentCol]);
    possibleMoves.push([currentRow, currentCol - 1]);
    possibleMoves.push([currentRow, currentCol + 1]);
    possibleMoves.push([currentRow - 1, currentCol - 1]);
    possibleMoves.push([currentRow - 1, currentCol + 1]);
    possibleMoves.push([currentRow + 1, currentCol - 1]);
    possibleMoves.push([currentRow + 1, currentCol + 1]);

    return possibleMoves.filter(move => {
      return this.isValidMove(
        board,
        false,
        currentRow,
        currentCol,
        move[0],
        move[1]
      );
    });

    // add castling later
  }
}

class Queen extends Piece {
  constructor(color, row, col) {
    let imgURL;
    // white img
    if (color === 0) {
      imgURL = QueenImg_W
    }
    // black img
    else {
      imgURL = QueenImg
    }

    super(color, imgURL, row, col);
  }

  // possible moves that queen can make
  possibleMoves(board) {
    const currentRow = this.row;
    const currentCol = this.col;
    const maxDimension = 8; // max units in any direction
    const possibleMoves = [];

    /* possible moves for queen; to simplify code, I pushed in 
       7 units in all 8 directions and then filtered (rather than
       having to create separate conditionals for all 8 directions) */
    for (let i = 1; i < maxDimension; i++) {
      possibleMoves.push([currentRow + i, currentCol]);
      possibleMoves.push([currentRow - i, currentCol]);
      possibleMoves.push([currentRow, currentCol + i]);
      possibleMoves.push([currentRow, currentCol - i]);
      possibleMoves.push([currentRow + i, currentCol + i]);
      possibleMoves.push([currentRow + i, currentCol - i]);
      possibleMoves.push([currentRow - i, currentCol + i]);
      possibleMoves.push([currentRow - i, currentCol - i]);
    }

    return possibleMoves.filter(move => {
      return this.isValidMove(
        board,
        false,
        currentRow,
        currentCol,
        move[0],
        move[1]
      );
    });
  }
}
class Bishop extends Piece {
  constructor(color, row, col) {
    let imgURL;
    // white img
    if (color === 0) {
      imgURL = BishopImg_W;
    }
    // black img
    else {
      imgURL = BishopImg;
    }

    super(color, imgURL, row, col);
  }

  // possible moves that bishop can make
  possibleMoves(board) {
    const currentRow = this.row;
    const currentCol = this.col;
    const maxDimension = 8; // max units in any direction
    const possibleMoves = [];

    /* possible moves for bishop; to simplify code, I pushed in 
         7 units in all 4 directions and then filtered */
    for (let i = 1; i < maxDimension; i++) {
      possibleMoves.push([currentRow + i, currentCol + i]);
      possibleMoves.push([currentRow + i, currentCol - i]);
      possibleMoves.push([currentRow - i, currentCol + i]);
      possibleMoves.push([currentRow - i, currentCol - i]);
    }

    return possibleMoves.filter(move => {
      return this.isValidMove(
        board,
        false,
        currentRow,
        currentCol,
        move[0],
        move[1]
      );
    });
  }
}
class Knight extends Piece {
  constructor(color, row, col) {
    let imgURL;
    // white img
    if (color === 0) {
      imgURL = HorseImg_W;
    }
    // black img
    else {
      imgURL = HorseImg;
    }

    super(color, imgURL, row, col);
  }

  // possible moves that knight can make
  possibleMoves(board) {
    const currentRow = this.row;
    const currentCol = this.col;
    const possibleMoves = [];

    possibleMoves.push([currentRow - 2, currentCol + 1]);
    possibleMoves.push([currentRow - 2, currentCol - 1]);
    possibleMoves.push([currentRow + 2, currentCol + 1]);
    possibleMoves.push([currentRow + 2, currentCol - 1]);
    possibleMoves.push([currentRow + 1, currentCol - 2]);
    possibleMoves.push([currentRow - 1, currentCol - 2]);
    possibleMoves.push([currentRow + 1, currentCol + 2]);
    possibleMoves.push([currentRow - 1, currentCol + 2]);

    return possibleMoves.filter(move => {
      return this.isValidMove(
        board,
        true,
        currentRow,
        currentCol,
        move[0],
        move[1]
      );
    });
  }
}
class Rook extends Piece {
  constructor(color, row, col) {
    let imgURL;
    // white img
    if (color === 0) {
      imgURL = RookImg_W;
    }
    // black img
    else {
      imgURL = RookImg;
    }

    super(color, imgURL, row, col);
  }
  // possible moves that rook can make
  possibleMoves(board) {
    const currentRow = this.row;
    const currentCol = this.col;
    const maxDimension = 8; // max units in any direction
    const possibleMoves = [];

    /* possible moves for rook; to simplify code, I pushed in 
       7 units in all 4 directions and then filtered */
    for (let i = 1; i < maxDimension; i++) {
      possibleMoves.push([currentRow + i, currentCol]);
      possibleMoves.push([currentRow - i, currentCol]);
      possibleMoves.push([currentRow, currentCol + i]);
      possibleMoves.push([currentRow, currentCol - i]);
    }

    return possibleMoves.filter(move => {
      return this.isValidMove(
        board,
        false,
        currentRow,
        currentCol,
        move[0],
        move[1]
      );
    });
  }
}
class Pawn extends Piece {
  constructor(color, row, col) {
    let imgURL;
    
   
    // white img
    if (color === 0) {
      imgURL=PawnImg_W;
    }
    // black img
    else {
      imgURL=PawnImg;
    }

    super(color, imgURL, row, col);
    this.hasUsedFirstMove = false;
  }

  hasBeenMoved() {
    this.hasUsedFirstMove = true;
  }

  // possible moves that pawn can make
  possibleMoves(board) {
    const currentRow = this.row;
    const currentCol = this.col;


    const possibleMoves = [];

    // direction for white
    if (this.color === 0) {
      // 1 unit forward
      if (
        this.indexInRange(currentRow - 1, currentCol) &&
        !this.enemyAtIndex(board, currentRow - 1, currentCol)
      ) {
        possibleMoves.push([currentRow - 1, currentCol]);
        
        // console.log("row", currentRow)
      }
      
      // 2 units forward
      if (
        this.indexInRange(currentRow - 2, currentCol) &&
        !this.hasUsedFirstMove &&
        !this.enemyAtIndex(board, currentRow - 2, currentCol)
      ) {
        possibleMoves.push([currentRow - 2, currentCol]);
      }
      // diagonals if enemy present
      if (
        this.indexInRange(currentRow - 1, currentCol + 1) &&
        this.enemyAtIndex(board, currentRow - 1, currentCol + 1)
      ) {
        possibleMoves.push([currentRow - 1, currentCol + 1]);
      }
      if (
        this.indexInRange(currentRow - 1, currentCol - 1) &&
        this.enemyAtIndex(board, currentRow - 1, currentCol - 1)
      ) {
        possibleMoves.push([currentRow - 1, currentCol - 1]);
      }



      // MAKE QUEEN?
      const spawnQueen = [];
      const BoardHelperFuncs = require("./boardHelperFunctions.js");
      const ChessPieces = require("./chessPieces.js");
      if (
        // currentRow === 4) 
       
        this.indexInRange(currentRow - 1, currentCol - 1) &&
        this.enemyAtIndex(board, currentRow - 1, currentCol - 1) &&
        currentRow === 4
      ) {
        console.log('QUEEN', currentRow)

        
        BoardHelperFuncs.getStartBoard(  
        spawnQueen.push(new Queen(0, 4, 3)));
      }

    }


    // direction for black
    else {
      // 1 unit forward
      if (
        this.indexInRange(currentRow + 1, currentCol) &&
        !this.enemyAtIndex(board, currentRow + 1, currentCol)
      ) {
        possibleMoves.push([currentRow + 1, currentCol]);
      }
      // 2 units forward
      if (
        this.indexInRange(currentRow + 2, currentCol) &&
        !this.hasUsedFirstMove &&
        !this.enemyAtIndex(board, currentRow + 2, currentCol)
      ) {
        possibleMoves.push([currentRow + 2, currentCol]);
      }
      // diagonals if enemy present
      if (
        this.indexInRange(currentRow + 1, currentCol + 1) &&
        this.enemyAtIndex(board, currentRow + 1, currentCol + 1)
      ) {
        possibleMoves.push([currentRow + 1, currentCol + 1]);
      }
      if (
        this.indexInRange(currentRow + 1, currentCol - 1) &&
        this.enemyAtIndex(board, currentRow + 1, currentCol - 1)
      ) {
        possibleMoves.push([currentRow + 1, currentCol - 1]);
      }
    }

    return possibleMoves.filter(move => {
      return this.isValidMove(
        board,
        false,
        currentRow,
        currentCol,
        move[0],
        move[1]
      );
    });
  }
}



export {
  Piece,
  King,
  Queen,
  Bishop,
  Knight,
  Rook,
  Pawn
};