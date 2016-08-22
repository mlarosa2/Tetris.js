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
  this.score     = 0;
  this.menu      = 'main';
};

Game.BG_COLOR         = '#FFFFFF';
Game.DIM_X            = 300;
Game.DIM_Y            = 600;
Game.FALL_RATE        = 2;
Game.OriginalFallRate = 2;

Game.prototype.togglePause = function () {
  this.paused = !this.paused;
};

Game.prototype.renderPausedMenu = function (ctx) {
  ctx.beginPath();
  ctx.rect(50, 200, 200, 100 );
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.font = '30px sans-serif';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'red';
  ctx.strokeText('PAUSED', 90, 260);
  ctx.fillText('PAUSED', 90, 260);
};

Game.prototype.renderGameOverMenu = function (ctx) {

  ctx.beginPath();
  ctx.rect(50, 200, 200, 100 );
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.font = '30px sans-serif';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'red';
  ctx.strokeText('Game Over', 72, 250);
  ctx.fillText('Game Over', 72, 250);
  ctx.font = '15px sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText('Press "r" to replay.', 93, 275);
};

Game.prototype.renderMainMenu = function (ctx) {
  if (this.menu !== "main") return;
  ctx.beginPath();
  ctx.rect(50, 200, 200, 100 );
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.font = '30px sans-serif';
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'red';
  ctx.strokeText('TETЯIS.JS', 75, 250);
  ctx.fillText('TETЯIS.JS', 75, 250);
  ctx.font = '15px sans-serif';
  ctx.fillStyle = 'black';
  ctx.fillText('Press "s" to start.', 93, 275);
};

Game.prototype.removeMainMenu = function () {
  this.menu = 'play';
  document.getElementById('next-image').style.opacity = 1;
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
  if (this.menu === 'main') {
    document.getElementById('next-piece').innerHTML = `<img id="next-image" style="opacity:0" src="./img/${this.nextPiece[0].name}.png">`;
  } else {
    document.getElementById('next-piece').innerHTML = `<img id="next-image" src="./img/${this.nextPiece[0].name}.png">`;
  }
  this.pieces.push(piece);
};

Game.prototype.setNextPiece = function () {
  this.nextPiece.push(this.randomPiece());
};

Game.prototype.hideNextPiece = function () {
  document.getElementById('next-piece').innerHTML = `<img id="next-image" style="opacity:0" src="./img/${this.nextPiece[0].name}.png">`
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  if (this.menu === 'main') {
    this.renderMainMenu(ctx);
  }

  this.pieces.forEach( piece => {
    piece.draw(ctx);
  });

  if (this.paused) {
    this.renderPausedMenu(ctx);
  }

  if (this.menu === 'over') {
    this.hideNextPiece();
    this.renderGameOverMenu(ctx);
  }
};

Game.prototype.setScore = function () {
  let scoreTag       = document.getElementById('score');
  scoreTag.innerHTML = this.score;
  this.increaseFallRate();
};

Game.prototype.increaseFallRate = function () {
  if (this.score % 2500 === 0 && this.score !== 0) {
    Game.FALL_RATE += 1;
    Game.OriginalFallRate += 1;
  }
}

Game.prototype.movePiece = function (delta) {
  const piece = this.pieces[this.pieces.length - 1];
  const board = this.board;
  for (let i = 0; i < piece.location.length; i++) {
    if (this.paused || this.menu === 'main' || this.menu === 'over') {
      Game.FALL_RATE = 0;
    } else {
      Game.FALL_RATE = Game.OriginalFallRate;
    };
    piece.location[i][1] += Game.FALL_RATE;
  }
};

Game.prototype.checkForGameOver = function () {
  if (this.board.isOver()) {
    this.menu = 'over';
  }
};

Game.prototype.reset = function (ctx) {
  this.menu             = 'replay';
  this.pieces           = [];
  Game.FALL_RATE        = 2;
  Game.OriginalFallRate = 2;
  this.score            = 0;
  this.nextPiece        = [];
  this.setScore();
  this.board.reset();
};

Game.prototype.step = function (delta, ctx) {
  if (this.menu === 'replay') {
    this.draw(ctx);
    this.menu = 'play';
  }
  const lastPiece = this.pieces[this.pieces.length - 1];
  if (this.pieces.length == 0) {
    this.setNextPiece();
    this.addPiece();
  } else {
    if (this.pieces.length > 0 && !this.board.isNextRowSet(lastPiece)) {
      this.movePiece(delta);
    } else {
      this.checkForGameOver();
      if (this.menu !== 'over') {
        this.board.addPiece(lastPiece);
        this.addPiece();
      }
      if (this.menu === 'over') {
        this.movePiece(delta);
      }
      let fullRows = this.board.checkForFullRow();
      if (Object.keys(fullRows).length > 0) {
        this.score += Object.keys(fullRows).length * 100;
        if (Object.keys(fullRows).length === 4) this.score += 400;
        this.setScore();
        this.board.clearRows(fullRows, ctx, Game.DIM_X, Game.BG_COLOR);
      }
    }
  }
};


module.exports = Game;
