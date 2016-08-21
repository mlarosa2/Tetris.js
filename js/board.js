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
    let row    = Math.floor(piece.location[i][1] / 30) + 1;
    column > 9 ? column = 9 : column;
    row < 0 ? row = 0 : row;
    if (boardAsArray[row][column].length > 0) {
      return true;
    }
  }

  return false;
};

Board.prototype.getBoard = function () {
  return boardAsArray;
};

Board.prototype.checkForFullRow = function () {
  const fullRows = {};

  for (let i = 0; i < boardAsArray.length - 1; i++) {
    let rowFull = true;
    for (let j = 0; j < boardAsArray[0].length; j++) {
      if (boardAsArray[i][j] === []) {
        rowFull = false;
      }
    }
    if (rowFull) {
      fullRows[i] = boardAsArray[i];
    }
  }
};

Board.prototype.clearRows = function (rows, ctx, dim_x, color) {
  for (let row in rows) {
    if (rows.hasOwnProperty(row)) {
      for (let i = 0; i < 10; i++) {
        rows[row][i][0].location.splice(indexOf([i * 30, row * 30]), 1);
        rows[row][i] = [];
      }
      ctx.clearRect(0, row * 30, dim_x, 30);
      ctx.fillStyle = color;
      ctx.fillRect(0, row * 30, dim_x, 30);
      for (let j = 0; j < row; j++) {
        for (let k = 0; k < 10; k++) {
          if (boardAsArray[j][k].length > 0) {
            boardAsArray[j][k][0].location[indexOf([j * 30, k * 30])].forEach( coord => {
              coord += 30;
            });
          }
        }
      }
    }
  }
};

Board.prototype.addPiece = function (piece) {
  piece.location.forEach( block => {
    const column = Math.floor(block[0] / 30);
    const row    = Math.floor(block[1] / 30);
    block[0]     = column * 30;
    block[1]     = row * 30;
    boardAsArray[row][column] = [piece];
  });
};

module.exports = Board;
