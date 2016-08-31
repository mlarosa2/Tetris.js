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
  this.board       = new Board();
  this.pieces      = [];
  this.score       = 0;
  this.paused      = false;
  this.nextPiece   = [];
  this.score       = 0;
  this.menu        = 'main';
  this.setInitials = false;
  this.allScores   = [];
};

Game.BG_COLOR         = '#FAFAFA';
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
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.font = "18px 'Press Start 2P'";
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'red';
  ctx.strokeText('PAUSED', 95, 260);
  ctx.fillText('PAUSED', 95, 260);
};

Game.prototype.renderGameOverMenu = function (ctx) {
  ctx.beginPath();
  ctx.rect(50, 200, 200, 100 );
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.font = "18px 'Press Start 2P'";
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'red';
  ctx.strokeText('Game Over', 67, 250);
  ctx.fillText('Game Over', 67, 250);
  ctx.font = "8px 'Press Start 2P'";
  ctx.fillStyle = 'black';
  ctx.fillText('Press "r" to replay.', 73, 275);
};

Game.prototype.renderMainMenu = function (ctx) {
  if (this.menu !== "main") return;
  ctx.beginPath();
  ctx.rect(50, 200, 200, 150);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.font = "18px 'Press Start 2P'";
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'red';
  ctx.strokeText('TETЯIS.JS', 70, 250);
  ctx.fillText('TETЯIS.JS', 70, 250);
  ctx.font = "8px 'Press Start 2P'";
  ctx.fillStyle = 'black';
  ctx.fillText('Press "s" to start.', 83, 275);
  ctx.fillText('wasd - direction', 90, 300);
  ctx.fillText('q/e - rotate left/right', 58, 325);
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

  if (this.board.isOver() && this.score >= this.lowestHighScore() && !this.setInitials) {
    this.menu = 'over';
    if (this.allScores.length === 0) {
      this.setAllScores();
      this.renderHiScoreMenu();
    }
  } else if (this.board.isOver()) {
    this.menu = 'over';
  }
};

Game.prototype.setAllScores = function () {
  const menu = document.getElementById("enter-score");
  const dbRefObject = firebase.database().ref();
  const thisGame = this;
  dbRefObject.on("value", function(snapshot) {
    if (snapshot.val()) {
      let scores = snapshot.val().scores;
      for (let score in scores) {
        if (scores.hasOwnProperty(score)) {
          let initials = Object.keys(scores[score])[0];
          thisGame.allScores.push([initials, scores[score][initials]]);
        }
      }
    }
  });

  thisGame.allScores.pop();
  menu.className = "";
};

Game.prototype.renderHiScoreMenu = function () {
  const menu = document.getElementById("enter-score");
  const submitHi = document.getElementById("submit");
  const thisGame = this;
  submitHi.addEventListener('click', (e) => {
    e.preventDefault();
    let initials = document.getElementById("initials").value;
    if (initials.length > 3) {
      initials = initials.slice(0, 3).toUpperCase();
    }
    if (initials.length === 0) {
      initials = "???";
    }
    if (thisGame.score >= thisGame.allScores[0][1]) {
      thisGame.allScores.unshift([initials, thisGame.score]);
    } else if (thisGame.score < this.allScores[1][1]) {
      thisGame.allScores.push([initials, thisGame.score]);
    } else {
      let last = thisGame.allScores.pop();
      thisGame.allScores.push([initials, thisGame.score]);
      thisGame.allScores.push(last);
    }
    const one = {};
    const two = {};
    const three = {};

    one[thisGame.allScores[0][0]] = thisGame.allScores[0][1];
    two[thisGame.allScores[1][0]] = thisGame.allScores[1][1];
    three[thisGame.allScores[2][0]] = thisGame.allScores[2][1];
    firebase.database().ref().child('scores').set({});
    firebase.database().ref().child('scores').push(one);
    firebase.database().ref().child('scores').push(two);
    firebase.database().ref().child('scores').push(three);
    menu.className = "hide";
    thisGame.setInitials = true;
    thisGame.menu = 'over';
    thisGame.allScores = [];
  });
};

Game.prototype.lowestHighScore = function () {
  const dbRefObject = firebase.database().ref();
  const allScores = [];

  const low = dbRefObject.on("value", function(snapshot) {
    if (snapshot.val()) {
      let scores = snapshot.val().scores;
      for (let score in scores) {
        if (scores.hasOwnProperty(score)) {
          let initials = Object.keys(scores[score])[0];
          allScores.push(scores[score][initials]);
        }
      }
    }
  });
  dbRefObject.off("value", low);
  return Math.min.apply(Math, allScores);
};

Game.prototype.reset = function (ctx) {
  this.menu             = 'replay';
  this.pieces           = [];
  Game.FALL_RATE        = 2;
  Game.OriginalFallRate = 2;
  this.score            = 0;
  this.nextPiece        = [];
  this.setInitials      = false;
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
