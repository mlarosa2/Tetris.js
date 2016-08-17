const Board = require('./board');
const Square = require('./pieces/square');


const Game = function () {
  this.board  = new Board();
  this.pieces = [];
  this.score  = 0;
};

Game.BG_COLOR = '#FFFFFF';
Game.DIM_X = 300;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.PIECES = {
  1 : new Square()
};

Game.prototype.randomPiece = function () {
  return Game.PIECES[Math.floor(Math.random() * (1) + 1)]
};

Game.prototype.addPiece = function () {
  let piece = this.randomPiece();
  this.pieces.push(piece);
  this.board.addPiece(piece);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  for (let i = 4; i < 24; i++) {
    for (let j = 0; j < 10; j++) {
      ctx.strokeRect(j * 30, i * 30, 30, 30)
    }
  }

  this.pieces.forEach( piece => {
    piece.draw(ctx);
  });
};

Game.prototype.movePiece = function (delta) {
  const piece = this.pieces[this.pieces.length - 1];
  piece.location.forEach( block => {
    this.board.boardAsArray[block[0]][block[1]] = [];
    block[1] += 1;
  });

  piece.location.forEach( block => {
    this.board.boardAsArray[block[0]][block[1]] = piece.color;
  });

};

Game.prototype.step = function (delta) {
  if (this.pieces.length > 0 && this.pieces[this.pieces.length - 1].set === false) {
    this.movePiece(delta);
  } else {
    this.addPiece();
  }
};


module.exports = Game;
