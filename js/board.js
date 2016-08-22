let boardAsArray = [
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


const Board = function () {
  this.over = false;
}

Board.prototype.isOver = function () {
  return this.over;
};

Board.prototype.reset = function () {
  this.over = false;
  boardAsArray = [
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
};

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

Board.prototype.checkForGameOver = function () {
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
      if (boardAsArray[i][j].length === 0) {
        rowFull = false;
      }
    }
    if (rowFull) {
      fullRows[i] = boardAsArray[i];
    }
  }

  return fullRows;
};

Board.prototype.clearRows = function (rows, ctx, dim_x, color) {
  for (let row in rows) {
    if (rows.hasOwnProperty(row)) {
      for (let i = 0; i < 10; i++) {
        let index;
        let piece = rows[row][i][0];
        for (let h = 0; h < piece.location.length; h++) {
          if (piece.location[h][0] === i * 30 && piece.location[h][1] === row * 30) {
            index = h;
          }
        }
        piece.location.splice(index, 1);
        rows[row][i] = [];
      }

      ctx.beginPath();
      ctx.rect(0, row * 30, dim_x, 30);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.stroke();

      for (let j = row - 1; j >= 0; j--) {
        for (let k = 0; k < 10; k++) {
          if (boardAsArray[j][k].length > 0) {
            let piece = boardAsArray[j][k][0];
            boardAsArray[j][k] = [];
            for (let l = 0; l < piece.location.length; l++) {
              if (piece.location[l][0] === k * 30 && piece.location[l][1] === j * 30) {
                piece.location[l][1] += 30;
                boardAsArray[j + 1][k] = [piece];
              }
            }
          }
        }
      }
    }
  }
};

Board.prototype.addPiece = function (piece) {
  for (let i = 3; i >= 0; i--) {
    if (piece.location[i][1] < 0) {
      piece.location.splice(i, 1);
      this.over = true;
    }
  }

  piece.location.forEach( block => {
    const column = Math.floor(block[0] / 30);
    const row    = Math.floor(block[1] / 30);
    block[0]     = column * 30;
    block[1]     = row * 30;
    boardAsArray[row][column] = [piece];
  });
};

module.exports = Board;
