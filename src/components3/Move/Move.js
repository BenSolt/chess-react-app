import { Knight } from "./Components/Knight";
import { Pawn } from "./Components/Pawn";
import { Rook } from "./Components/Rook";
import { Bishop } from "./Components/Bishop";
import { Queen } from "./Components/Queen";
import { King } from "./Components/King";

import {AA} from "./Components/AA";

export const Move = (e, i, j, temp, board) => {
  if (e[0] === "n" || e[0] === "N") {
    return Knight(e, i, j, temp, board);
  } else if (e[0] === "p" || e[0] === "P") {
    return Pawn(e, i, j, temp, board);
  } else if (e[0] === "r" || e[0] === "R") {
    return Rook(e, i, j, temp, board);
  } else if (e[0] === "b" || e[0] === "B") {
    return Bishop(e, i, j, temp, board);
  } else if (e[0] === "q" || e[0] === "Q") {
    return Queen(e, i, j, temp, board);
  } else if (e[0] === "k" || e[0] === "K") {
    return King(e, i, j, temp, board);

  } else if (e[0] === "v" || e[0] === "V") {
    return AA(e, i, j, temp, board);
  }
};