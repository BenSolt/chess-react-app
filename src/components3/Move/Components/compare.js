export const compare = (piece) => {
    if (!piece) {
      return false;
    }
    return piece === piece.toUpperCase() ? "white" : "black";
  };