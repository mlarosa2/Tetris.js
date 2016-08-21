const Board  = require('./board');
const Square = require('./pieces/square');
const Line   = require('./pieces/line');
const LeftL  = require('./pieces/left_l');
const RightL = require('./pieces/right_l');
const LeftZ  = require('./pieces/left_z');
const RightZ = require('./pieces/right_z');
const Tee    = require('./pieces/t');

const NUM_PIECES = 7

const Game = function () {
  this.board     = new Board();
  this.pieces    = [];
  this.score     = 0;
  this.paused    = false;
  this.nextPiece = [];
};

Game.BG_COLOR       = '#FFFFFF';
Game.DIM_X          = 300;
Game.DIM_Y          = 600;
Game.FALL_RATE        = 2;
Game.OriginalFallRate = 2;

Game.prototype.togglePause = function () {
  this.paused = !this.paused;
};

Game.prototype.randomPiece = function () {
  const choose = Math.floor(Math.random() * NUM_PIECES + 1);
  switch (choose) {
    case 1:
      return new Square(this.board);
      break;
    case 2:
      return new Line(this.board);
      break;
    case 3:
      return new LeftL(this.board);
      break;
    case 4:
      return new RightL(this.board);
      break;
    case 5:
      return new LeftZ(this.board);
      break;
    case 6:
      return new RightZ(this.board);
      break;
    case 7:
      return new Tee(this.board);
      break;
  }
};

Game.prototype.addPiece = function () {
  let piece = this.nextPiece.shift();
  this.nextPiece.push(this.randomPiece());
  this.pieces.push(piece);
};

Game.prototype.setNextPiece = function () {
  this.nextPiece.push(this.randomPiece());
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.pieces.forEach( piece => {
    piece.draw(ctx);
  });
};

Game.prototype.movePiece = function (delta) {
  const piece = this.pieces[this.pieces.length - 1];
  const board = this.board;
  for (let i = 0; i < piece.location.length; i++) {
    if (this.paused) {
      Game.FALL_RATE = 0;
    } else {
      Game.FALL_RATE = Game.OriginalFallRate;
    };
    piece.location[i][1] += Game.FALL_RATE;
  }
};

Game.prototype.step = function (delta, ctx) {
  const lastPiece = this.pieces[this.pieces.length - 1];
  if (this.pieces.length == 0) {
    this.setNextPiece();
    this.addPiece();
  } else {
    if (this.pieces.length > 0 && !this.board.isNextRowSet(lastPiece)) {
      this.movePiece(delta);
    } else {
      this.board.addPiece(lastPiece);
      this.addPiece();
      let fullRows = this.board.checkForFullRow();
      if (Object.keys(fullRows).length > 0) {
        this.board.clearRows(fullRows, ctx, Game.DIM_X, Game.BG_COLOR);
      }
    }
  }
};


module.exports = Game;
