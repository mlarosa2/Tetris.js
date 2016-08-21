const PIECE_SIZE = 30;
const MOVES = {
  LEFT        : "left",
  RIGHT       : "right",
  DOWN        : "down",
  ROTATE_LEFT : "rotate left"
}
const Piece = function (board) {
  this.board    = board.getBoard()
  this.set      = false;
  this.color    = null;
  this.location = [];
};
Piece.prototype.move = function(direction) {
  switch (direction) {
    case MOVES.RIGHT:
      for (let j = 0; j < this.location.length; j++) {
        if (this.location[j][0] >= 270 || this.checkColRight()) {
          return;
        }
      }
      for (let i = 0; i < this.location.length; i++) {
        if (this.location[i][0] <= 270) {
          this.location[i][0] += 30;
        }
      }
    break;
    case MOVES.LEFT:
      for (let j = 0; j < this.location.length; j++) {
        if (this.location[j][0] <= 0 || this.checkColLeft()) {
          return;
        }
      }
      for (let i = 0; i < this.location.length; i++) {
        if (this.location[i][0] >= 0) {
          this.location[i][0] -= 30;
        }
      }
      break;
      case MOVES.DOWN:
        for (let j = 0; j < this.location.length; j++) {
          if (this.location[j][1] <= 0) {
            return;
          }
        }
        for (let i = 0; i < this.location.length; i++) {
          this.location[i][1] += 10;
        }
        break;
  }
},
Piece.prototype.checkColLeft = function () {
  for (let i = 0; i < this.location.length; i++) {
    let columnLeft  = Math.ceil(this.location[i][0] / 30) - 1;
    let row         = Math.ceil(this.location[i][1] / 30);
    columnLeft < 0 ? columnLeft = 0 : columnLeft;
    row < 0 ? row = 0 : row;
    if (this.board[row][columnLeft].length > 0) {
      return true;
    }
  }

  return false;
};
Piece.prototype.isSpaceTaken = function (block) {
  let column = Math.abs(Math.floor(block[0] / 30));
  let row    = Math.floor(block[1] / 30);
  column > 9 ? column = 9 : column;
  row < 0 ? row = 0 : row;

  if (this.board[row][column].length > 0 || block[0] >= 300 || block[0] < 0) {
    return true;
  }

  return false;
};
Piece.prototype.checkColRight = function () {
  for (let i = 0; i < this.location.length; i++) {
    let columnRight = Math.ceil(this.location[i][0] / 30) + 1;
    let row         = Math.ceil(this.location[i][1] / 30);
    columnRight > 9 ? columnRight = 9 : columnRight;
    row < 0 ? row = 0 : row;
    if (this.board[row][columnRight].length > 0) {
      return true;
    }
  }

  return false;
};
Piece.prototype.draw = function (ctx) {
  this.location.forEach( block => {
    ctx.beginPath();
    ctx.rect(block[0], block[1], PIECE_SIZE, PIECE_SIZE );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  });
};
Piece.prototype.rotateLeft = function (paused) {

};
Piece.prototype.rotateRight = function(paused) {

};

module.exports = Piece;
