import React from "react";

import { compare } from "./compare";

export const Bishop = (e, i, j, temp, board) => {
  temp[e[1]].splice(e[2], 1, e[0]);
  for (let t = e[1] - 1, r = e[2] + 1; t >= 0 && r <= 7; t--, r++) {
    if (!board[t][r]) {
      temp[t].splice(r, 1, "x");
    } else if (compare(board[t][r]) !== compare(e[0])) {
      temp[t].splice(r, 1, "x");
      break;
    } else if (compare(board[t][r]) === compare(e[0])) {
      break;
    }
  }
  for (let b = e[1] + 1, r = e[2] + 1; b <= 7 && r <= 7; b++, r++) {
    if (!board[b][r]) {
      temp[b].splice(r, 1, "x");
    } else if (compare(board[b][r]) !== compare(e[0])) {
      temp[b].splice(r, 1, "x");
      break;
    } else if (compare(board[b][r]) === compare(e[0])) {
      break;
    }
  }
  for (let b = e[1] + 1, l = e[2] - 1; b <= 7 && l >= 0; b++, l--) {
    if (!board[b][l]) {
      temp[b].splice(l, 1, "x");
    } else if (compare(board[b][l]) !== compare(e[0])) {
      temp[b].splice(l, 1, "x");
      break;
    } else if (compare(board[b][l]) === compare(e[0])) {
      break;
    }
  }
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
  return temp;
};