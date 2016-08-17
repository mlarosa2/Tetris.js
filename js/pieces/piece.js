const Piece = function () {
  this.set = false;
  this.color = null;
  this.location = [];
};


Piece.prototype.rotateRight = function () {};
Piece.prototype.rotateLeft = function () {};
Piece.prototype.draw = function (ctx) {
  this.location.forEach( block => {
    if (block[0] > 3) {
      ctx.beginPath();
      ctx.rect((block[0] - 4) * 30, block[1] * 30, 30, 30 )
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.stroke()
    }
  });
};

module.exports = Piece;
