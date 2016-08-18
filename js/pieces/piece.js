const PIECE_SIZE = 30;
const MOVES = {
  LEFT  : "left",
  RIGHT : "right",
  DOWN  : "down"
}
const Piece = function () {
  this.set = false;
  this.color = null;
  this.location = [];
};
Piece.prototype.move = function(direction) {
  switch (direction) {
    case MOVES.RIGHT:
    for (let j = 0; j < this.location.length; j++) {
      if (this.location[j][0] >= 270) {
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
        if (this.location[j][0] <= 0) {
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
Piece.prototype.rotateRight = function () {};
Piece.prototype.rotateLeft = function () {};
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

module.exports = Piece;
