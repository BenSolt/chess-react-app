import React from "react";
import { compare } from "./compare";

export const PawnUp = (e, i, j, temp, board) => {
  // PLAYER WHITE PAWN
  temp[e[1]].splice(e[2], 1, e[0]);
  if (compare(e[0]) === "white" && e[1] !== 0) {
    let initial = e[1] === 5 ? true : false;

    // MOVE 2 if Start
    if (initial && !board[e[1] - 1][e[2]] && !board[e[1] - 2][e[2]]) {
      temp[e[1] - 2].splice(e[2], 1, "x");

    }
    for (let scan = e[2] - 1; scan <= e[2] + 1; scan++) {
      if (!board[e[1] - 1][e[2]]) {
        temp[e[1] - 1].splice(e[2], 1, "x");
      }
      // ATTACK OPPONENT
      if (board[e[1] - 1][scan]) {
          // if (compare(board[e[1] - 1][scan]) !== compare(e[0]) && scan !== e[2]) {
          if (compare(board[e[1] - 1][scan]) !== compare(e[0]) && scan !== e[1]) {
          temp[e[1] - 1].splice(scan, 1, "x");
        }
      }
    }

    // MOVE RIGHT
    for (let right = e[2] + 1; right <= 7; right++) {
      if (board[e[1]][right] === undefined) {
        temp[e[1]].splice(right, 1, "x");
        break;
      } else if (compare(board[e[1]][right]) !== compare(e[0])) {
        temp[e[1]].splice(right, 1, "x");
        break;
      } else if (compare(board[e[1]][right]) === compare(e[0])) {
        break;
      }
    }

    // MOVE LEFT
    for (let left = e[2] - 1; left >= 0; left--) {
      if (board[e[1]][left] === undefined) {
        temp[e[1]].splice(left, 1, "x");
        break;
      } else if (compare(board[e[1]][left]) !== compare(e[0])) {
        temp[e[1]].splice(left, 1, "x");
        break;
      } else if (compare(board[e[1]][left]) === compare(e[0])) {
        break;
      }
    }

    // Move 2 not at start////////////////////////////
    // if (!board[e[1] - 1][e[2]] && !board[e[1] - 2][e[2]]) {  
    //   temp[e[1] - 2].splice(e[2], 1, "x");
    // }

    // BISHOP DIAG Right
    for (let t = e[1] - 1, r = e[2] + 1; t >= 0 && r <= 5; t--, r++) {
      if (!board[t][r]) {
        temp[t].splice(r, 1, "x");
      } else if (compare(board[t][r]) !== compare(e[0])) {
        temp[t].splice(r, 1, "x");
        break;
      } else if (compare(board[t][r]) === compare(e[0])) {
        break;
      }
    }

    // BISHOP DIAG LEFT?
    for (let t = e[1] - 1, l = e[2] - 1; t >= 0 && l >= 0; t--, l--) {
      if (!board[t][l]) {
        temp[t].splice(l, 1, "x");
      } else if (compare(board[t][l]) !== compare(e[0])) {
        temp[t].splice(l, 1, "x");
        break;
      } else if (compare(board[t][l]) === compare(e[0])) {
        break;
      }
    }



    // PLAYER BLACK PAWN
  // } else if (compare(e[0]) === "black" && e[1] !== 7) {
  } else if (compare(e[0]) === "black" && e[1] !== 5) {
    let initial = e[1] === 0 ? true : false;
    if (initial && !board[e[1] + 1][e[2]] && !board[e[1] + 2][e[2]]) {
      // MOVE 2 Spaces
      temp[e[1] + 2].splice(e[2], 1, "x");
    }
    for (let scan = e[2] - 1; scan <= e[2] + 1; scan++) {
      if (!board[e[1] + 1][e[2]]) {
        temp[e[1] + 1].splice(e[2], 1, "x");
      }
      // ATTACK
      if (board[e[1] + 1][scan]) {
        // if (compare(board[e[1] + 1][scan]) !== compare(e[0]) && scan !== e[2]) {
        if (compare(board[e[1] - 1][scan]) !== compare(e[0]) && scan !== e[1]) {
          temp[e[1] + 1].splice(scan, 1, "x");
        }
      }
    }

    // MOVE RIGHT
    // for (let right = e[2] + 1; right <= 7; right++) {
    for (let right = e[2] + 1; right <= 5; right++) {
      if (board[e[1]][right] === undefined) {
        temp[e[1]].splice(right, 1, "x");
        break;
      } else if (compare(board[e[1]][right]) !== compare(e[0])) {
        temp[e[1]].splice(right, 1, "x");
        break;
      } else if (compare(board[e[1]][right]) === compare(e[0])) {
        break;
      }
    }

    // MOVE LEFT
    for (let left = e[2] - 1; left >= 0; left--) {
      if (board[e[1]][left] === undefined) {
        temp[e[1]].splice(left, 1, "x");
        break;
      } else if (compare(board[e[1]][left]) !== compare(e[0])) {
        temp[e[1]].splice(left, 1, "x");
        break;
      } else if (compare(board[e[1]][left]) === compare(e[0])) {
        break;
      }
    }

    // BISHOP DIAG Right
    for (let b = e[1] + 1, r = e[2] + 1; b <= 5 && r <= 5; b++, r++) {
      if (!board[b][r]) {
        temp[b].splice(r, 1, "x");
      } else if (compare(board[b][r]) !== compare(e[0])) {
        temp[b].splice(r, 1, "x");
        break;
      } else if (compare(board[b][r]) === compare(e[0])) {
        break;
      }
    }

    // BISHOP DIAG LEFT?
    for (let b = e[1] + 1, l = e[2] - 1; b <= 5 && l >= 0; b++, l--) {
      if (!board[b][l]) {
        temp[b].splice(l, 1, "x");
      } else if (compare(board[b][l]) !== compare(e[0])) {
        temp[b].splice(l, 1, "x");
        break;
      } else if (compare(board[b][l]) === compare(e[0])) {
        break;
      }
    }


  }
  return temp;
};