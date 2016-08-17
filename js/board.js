const Board = function () {
  this.boardAsArray = [
    // 0   1   2   3   4   5   6   7   8    9
    [[], [], [], [], [], [], [], [], [], []], // 0
    [[], [], [], [], [], [], [], [], [], []], // 1
    [[], [], [], [], [], [], [], [], [], []], // 2
    [[], [], [], [], [], [], [], [], [], []], // 3
    // BELOW IS VISIBLE TO PLAYER
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
    [[], [], [], [], [], [], [], [], [], []], // 20
    [[], [], [], [], [], [], [], [], [], []], // 21
    [[], [], [], [], [], [], [], [], [], []], // 22
    [[], [], [], [], [], [], [], [], [], []] // 23
  ];
};

Board.prototype.clearRow = function (row) {

};



Board.prototype.shiftBoardDown = function() {

};

Board.prototype.checkRow = function () {

};

Board.prototype.shiftPieceDown = function (piece) {

};

Board.prototype.addPiece = function (piece) {
  piece.location.forEach( block => {
    this.boardAsArray[block[0]][block[1]] = piece.color;
  });
};

module.exports = Board;