const boardAsArray = [
// 0   1   2   3   4   5   6   7   8    9
  [[], [], [], [], [], [], [], [], [], []], // 0
  [[], [], [], [], [], [], [], [], [], []], // 1
  [[], [], [], [], [], [], [], [], [], []], // 2
  [[], [], [], [], [], [], [], [], [], []], // 3
  [[], [], [], [], [], [], [], [], [], []], // 4
  [[], [], [], [], [], [], [], [], [], []], // 5
  [[], [], [], [], [], [], [], [], [], []], // 6
  [[], [], [], [], [], [], [], [], [], []], // 7
  [[], [], [], [], [], [], [], [], [], []], // 8
  [[], [], [], [], [], [], [], [], [], []], // 9
  [[], [], [], [], [], [], [], [], [], []], // 10
  [[], [], [], [], [], [], [], [], [], []], // 11
  [[], [], [], [], [], [], [], [], [], []], // 12
  [[], [], [], [], [], [], [], [], [], []], // 13
  [[], [], [], [], [], [], [], [], [], []], // 14
  [[], [], [], [], [], [], [], [], [], []], // 15
  [[], [], [], [], [], [], [], [], [], []], // 16
  [[], [], [], [], [], [], [], [], [], []], // 17
  [[], [], [], [], [], [], [], [], [], []], // 18
  [[], [], [], [], [], [], [], [], [], []], // 19
  [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]
];


const Board = function () {}

Board.prototype.isNextRowSet = function (piece) {
  for (let i = 0; i < piece.location.length; i++) {
    let column = Math.abs(Math.floor(piece.location[i][0] / 30));
    let row = Math.floor(piece.location[i][1] / 30) + 1;
    column > 9 ? column = 9 : column;
    row < 0 ? row = 0 : row;
    if (boardAsArray[row][column] === undefined) {
      debugger
    }
    if (boardAsArray[row][column].length > 0) {
      return true;
    }
  }

  return false;
};

Board.prototype.getBoard = function () {
  return boardAsArray;
};

Board.prototype.addPiece = function (piece) {
  piece.location.forEach( block => {
    const column = Math.floor(block[0] / 30);
    const row    = Math.floor(block[1] / 30);
    block[0] = column * 30;
    block[1] = row * 30;
    boardAsArray[row][column] = [piece.color];
  });
};

module.exports = Board;
