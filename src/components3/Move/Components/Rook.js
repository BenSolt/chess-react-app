import React from "react";
import { compare } from "./compare";

export const Rook = (e, i, j, temp, board) => {
  temp[e[1]].splice(e[2], 1, e[0]);
  for (let up = e[1] - 1; up >= 0; up--) {
    if (board[up][e[2]] === undefined) {
      temp[up].splice(e[2], 1, "x");
    } else if (compare(board[up][e[2]]) !== compare(e[0])) {
      temp[up].splice(e[2], 1, "x");
      break;
    } else if (compare(board[up][e[2]]) === compare(e[0])) {
      break;
    }
  }
  for (let right = e[2] + 1; right <= 7; right++) {
    if (board[e[1]][right] === undefined) {
      temp[e[1]].splice(right, 1, "x");
    } else if (compare(board[e[1]][right]) !== compare(e[0])) {
      temp[e[1]].splice(right, 1, "x");
      break;
    } else if (compare(board[e[1]][right]) === compare(e[0])) {
      break;
    }
  }
  for (let down = e[1] + 1; down <= 7; down++) {
    if (board[down][e[2]] === undefined) {
      temp[down].splice(e[2], 1, "x");
    } else if (compare(board[down][e[2]]) !== compare(e[0])) {
      temp[down].splice(e[2], 1, "x");
      break;
    } else if (compare(board[down][e[2]]) === compare(e[0])) {
      break;
    }
  }
  for (let left = e[2] - 1; left >= 0; left--) {
    if (board[e[1]][left] === undefined) {
      temp[e[1]].splice(left, 1, "x");
    } else if (compare(board[e[1]][left]) !== compare(e[0])) {
      temp[e[1]].splice(left, 1, "x");
      break;
    } else if (compare(board[e[1]][left]) === compare(e[0])) {
      break;
    }
  }
  return temp;
};