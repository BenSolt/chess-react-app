import { compare } from "./compare";

export const Knight = (e, i, j, temp, board) => {
  if (board[e[1] - 2]) {
    for (let place = e[2] - 1; place <= e[2] + 1; place += 2) {
      if (place < 0) {
      } else if (!board[e[1] - 2][place]) {
        temp[e[1] - 2].splice(place, 1, "x");
      } else if (compare(e[0]) !== compare(board[e[1] - 2][place])) {
        temp[e[1] - 2].splice(place, 1, "x");
      } else if (compare(e[0]) === compare(board[e[1] - 2][place])) {
      }
    }
  }
  if (board[e[1] - 1]) {
    for (let place = e[2] - 2; place <= e[2] + 2; place += 4) {
      if (place < 0) {
      } else if (!board[e[1] - 1][place]) {
        temp[e[1] - 1].splice(place, 1, "x");
      } else if (compare(e[0]) !== compare(board[e[1] - 1][place])) {
        temp[e[1] - 1].splice(place, 1, "x");
      } else if (compare(e[0]) === compare(board[e[1] - 1][place])) {
      }
    }
  }

  if (board[e[1] + 1]) {
    for (let place = e[2] - 2; place <= e[2] + 2; place += 4) {
      if (place < 0) {
      } else if (!board[e[1] + 1][place]) {
        temp[e[1] + 1].splice(place, 1, "x");
      } else if (compare(e[0]) !== compare(board[e[1] + 1][place])) {
        temp[e[1] + 1].splice(place, 1, "x");
      } else if (compare(e[0]) === compare(board[e[1] + 1][place])) {
      }
    }
  }
  if (board[e[1] + 2]) {
    for (let place = e[2] - 1; place <= e[2] + 1; place += 2) {
      if (place < 0) {
      } else if (!board[e[1] + 2][place]) {
        temp[e[1] + 2].splice(place, 1, "x");
      } else if (compare(e[0]) !== compare(board[e[1] + 2][place])) {
        temp[e[1] + 2].splice(place, 1, "x");
      } else if (compare(e[0]) === compare(board[e[1] + 2][place])) {
      }
    }
  }

  return temp;
};
