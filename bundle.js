/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(12);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById('canvas');
	  canvas.width = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	  var ctx = canvas.getContext("2d");
	  var game = new Game();
	  new GameView(game, ctx).start();
	});
	
	var mute = document.getElementById("volume");
	var audio = document.getElementById("theme");
	
	mute.addEventListener('click', function () {
	  if (!audio.paused) {
	    mute.innerHTML = '<span class="fa-stack"><i class="fa fa-music fa-stack-1x"></i><i class="fa fa-ban fa-stack-1x"></i></span> Unmute</span>';
	    mute.className = 'muted';
	    audio.pause();
	  } else {
	    mute.innerHTML = '<i class="fa fa-music"></i> Mute';
	    mute.className = '';
	    audio.play();
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Board = __webpack_require__(2);
	var Square = __webpack_require__(3);
	var Line = __webpack_require__(6);
	var LeftL = __webpack_require__(7);
	var RightL = __webpack_require__(8);
	var LeftZ = __webpack_require__(9);
	var RightZ = __webpack_require__(10);
	var Tee = __webpack_require__(11);
	
	var NUM_PIECES = 7;
	
	var Game = function Game() {
	  this.board = new Board();
	  this.pieces = [];
	  this.score = 0;
	  this.paused = false;
	  this.nextPiece = [];
	  this.score = 0;
	  this.menu = 'main';
	};
	
	Game.BG_COLOR = '#FAFAFA';
	Game.DIM_X = 300;
	Game.DIM_Y = 600;
	Game.FALL_RATE = 2;
	Game.OriginalFallRate = 2;
	
	Game.prototype.togglePause = function () {
	  this.paused = !this.paused;
	};
	
	Game.prototype.renderPausedMenu = function (ctx) {
	  ctx.beginPath();
	  ctx.rect(50, 200, 200, 100);
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
	  ctx.rect(50, 200, 200, 100);
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
	  var choose = Math.floor(Math.random() * NUM_PIECES + 1);
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
	  var piece = this.nextPiece.shift();
	  this.nextPiece.push(this.randomPiece());
	  if (this.menu === 'main') {
	    document.getElementById('next-piece').innerHTML = '<img id="next-image" style="opacity:0" src="./img/' + this.nextPiece[0].name + '.png">';
	  } else {
	    document.getElementById('next-piece').innerHTML = '<img id="next-image" src="./img/' + this.nextPiece[0].name + '.png">';
	  }
	  this.pieces.push(piece);
	};
	
	Game.prototype.setNextPiece = function () {
	  this.nextPiece.push(this.randomPiece());
	};
	
	Game.prototype.hideNextPiece = function () {
	  document.getElementById('next-piece').innerHTML = '<img id="next-image" style="opacity:0" src="./img/' + this.nextPiece[0].name + '.png">';
	};
	
	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	  if (this.menu === 'main') {
	    this.renderMainMenu(ctx);
	  }
	
	  this.pieces.forEach(function (piece) {
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
	  var scoreTag = document.getElementById('score');
	  scoreTag.innerHTML = this.score;
	  this.increaseFallRate();
	};
	
	Game.prototype.increaseFallRate = function () {
	  if (this.score % 2500 === 0 && this.score !== 0) {
	    Game.FALL_RATE += 1;
	    Game.OriginalFallRate += 1;
	  }
	};
	
	Game.prototype.movePiece = function (delta) {
	  var piece = this.pieces[this.pieces.length - 1];
	  var board = this.board;
	  for (var i = 0; i < piece.location.length; i++) {
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
	  this.menu = 'replay';
	  this.pieces = [];
	  Game.FALL_RATE = 2;
	  Game.OriginalFallRate = 2;
	  this.score = 0;
	  this.nextPiece = [];
	  this.setScore();
	  this.board.reset();
	};
	
	Game.prototype.step = function (delta, ctx) {
	  if (this.menu === 'replay') {
	    this.draw(ctx);
	    this.menu = 'play';
	  }
	  var lastPiece = this.pieces[this.pieces.length - 1];
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
	      var fullRows = this.board.checkForFullRow();
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var boardAsArray = [
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
	[[1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
	
	var Board = function Board() {
	  this.over = false;
	};
	
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
	  [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1]]];
	};
	
	Board.prototype.isNextRowSet = function (piece) {
	  for (var i = 0; i < piece.location.length; i++) {
	    var column = Math.abs(Math.floor(piece.location[i][0] / 30));
	    var row = Math.floor(piece.location[i][1] / 30) + 1;
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
	  var fullRows = {};
	
	  for (var i = 0; i < boardAsArray.length - 1; i++) {
	    var rowFull = true;
	    for (var j = 0; j < boardAsArray[0].length; j++) {
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
	  for (var row in rows) {
	    if (rows.hasOwnProperty(row)) {
	      for (var i = 0; i < 10; i++) {
	        var index = void 0;
	        var piece = rows[row][i][0];
	        for (var h = 0; h < piece.location.length; h++) {
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
	
	      for (var j = row - 1; j >= 0; j--) {
	        for (var k = 0; k < 10; k++) {
	          if (boardAsArray[j][k].length > 0) {
	            var _piece = boardAsArray[j][k][0];
	            boardAsArray[j][k] = [];
	            for (var l = 0; l < _piece.location.length; l++) {
	              if (_piece.location[l][0] === k * 30 && _piece.location[l][1] === j * 30) {
	                _piece.location[l][1] += 30;
	                boardAsArray[j + 1][k] = [_piece];
	              }
	            }
	          }
	        }
	      }
	    }
	  }
	};
	
	Board.prototype.addPiece = function (piece) {
	  for (var i = 3; i >= 0; i--) {
	    if (piece.location[i][1] < 0) {
	      piece.location.splice(i, 1);
	      this.over = true;
	    }
	  }
	
	  piece.location.forEach(function (block) {
	    var column = Math.floor(block[0] / 30);
	    var row = Math.floor(block[1] / 30);
	    block[0] = column * 30;
	    block[1] = row * 30;
	    boardAsArray[row][column] = [piece];
	  });
	};
	
	module.exports = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Piece = __webpack_require__(4);
	var colorConstants = __webpack_require__(5);
	
	var Square = function Square(board) {
	  Piece.call(this, board);
	  this.color = colorConstants.RED;
	  this.location = [[150, -60], [120, -60], [150, -90], [120, -90]];
	  this.name = "Square";
	};
	
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	Square.prototype = new Surrogate();
	
	module.exports = Square;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var PIECE_SIZE = 30;
	var MOVES = {
	  LEFT: "left",
	  RIGHT: "right",
	  DOWN: "down",
	  ROTATE_LEFT: "rotate left"
	};
	var Piece = function Piece(board) {
	  this.board = board.getBoard();
	  this.set = false;
	  this.color = null;
	  this.location = [];
	};
	Piece.prototype.move = function (direction) {
	  switch (direction) {
	    case MOVES.RIGHT:
	      for (var j = 0; j < this.location.length; j++) {
	        if (this.location[j][0] >= 270 || this.checkColRight()) {
	          return;
	        }
	      }
	      for (var i = 0; i < this.location.length; i++) {
	        if (this.location[i][0] <= 270) {
	          this.location[i][0] += 30;
	        }
	      }
	      break;
	    case MOVES.LEFT:
	      for (var _j = 0; _j < this.location.length; _j++) {
	        if (this.location[_j][0] <= 0 || this.checkColLeft()) {
	          return;
	        }
	      }
	      for (var _i = 0; _i < this.location.length; _i++) {
	        if (this.location[_i][0] >= 0) {
	          this.location[_i][0] -= 30;
	        }
	      }
	      break;
	    case MOVES.DOWN:
	      for (var _j2 = 0; _j2 < this.location.length; _j2++) {
	        if (this.location[_j2][1] <= 0) {
	          return;
	        }
	      }
	      for (var _i2 = 0; _i2 < this.location.length; _i2++) {
	        this.location[_i2][1] += 10;
	      }
	      break;
	  }
	}, Piece.prototype.checkColLeft = function () {
	  for (var i = 0; i < this.location.length; i++) {
	    var columnLeft = Math.ceil(this.location[i][0] / 30) - 1;
	    var row = Math.ceil(this.location[i][1] / 30);
	    columnLeft < 0 ? columnLeft = 0 : columnLeft;
	    row < 0 ? row = 0 : row;
	    if (this.board[row][columnLeft].length > 0) {
	      return true;
	    }
	  }
	
	  return false;
	};
	Piece.prototype.isSpaceTaken = function (block) {
	  var column = Math.abs(Math.floor(block[0] / 30));
	  var row = Math.floor(block[1] / 30);
	  column > 9 ? column = 9 : column;
	  row < 0 ? row = 0 : row;
	
	  if (this.board[row][column].length > 0 || block[0] >= 300 || block[0] < 0) {
	    return true;
	  }
	
	  return false;
	};
	Piece.prototype.checkColRight = function () {
	  for (var i = 0; i < this.location.length; i++) {
	    var columnRight = Math.ceil(this.location[i][0] / 30) + 1;
	    var row = Math.ceil(this.location[i][1] / 30);
	    columnRight > 9 ? columnRight = 9 : columnRight;
	    row < 0 ? row = 0 : row;
	    if (this.board[row][columnRight].length > 0) {
	      return true;
	    }
	  }
	
	  return false;
	};
	Piece.prototype.draw = function (ctx) {
	  var _this = this;
	
	  this.location.forEach(function (block) {
	    ctx.beginPath();
	    ctx.rect(block[0], block[1], PIECE_SIZE, PIECE_SIZE);
	    ctx.fillStyle = _this.color;
	    ctx.fill();
	    ctx.lineWidth = 1;
	    ctx.strokeStyle = 'black';
	    ctx.stroke();
	  });
	};
	Piece.prototype.rotateLeft = function (paused) {};
	Piece.prototype.rotateRight = function (paused) {};
	
	module.exports = Piece;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var colorConstants = {
	  RED: '#F00',
	  BLUE: '#00F',
	  GREEN: '#0F0',
	  YELLOW: '#FFFF00',
	  PURPLE: '#BF5FFF',
	  ORANGE: '#FFA500',
	  PINK: '#FF69B4'
	};
	
	module.exports = colorConstants;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Piece = __webpack_require__(4);
	var colorConstants = __webpack_require__(5);
	
	var Line = function Line(board) {
	  Piece.call(this, board);
	  this.color = colorConstants.BLUE;
	  this.location = [[120, -150], [120, -120], [120, -90], [120, -60]];
	  this.name = "Line";
	};
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	Line.prototype = new Surrogate();
	Line.prototype.rotateRight = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 60) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is left
	    if (this.location[i][0] === originBlock[0] - 60 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 60) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is right
	    if (this.location[i][0] === originBlock[0] + 60 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	Line.prototype.rotateLeft = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 60) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is right
	    if (this.location[i][0] === originBlock[0] + 60 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 60) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is left
	    if (this.location[i][0] === originBlock[0] - 60 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	
	module.exports = Line;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Piece = __webpack_require__(4);
	var colorConstants = __webpack_require__(5);
	
	var LeftL = function LeftL(board) {
	  Piece.call(this, board);
	  this.color = colorConstants.GREEN;
	  this.location = [[120, -120], [120, -90], [120, -60], [90, -60]];
	  this.name = "LeftL";
	};
	
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	LeftL.prototype = new Surrogate();
	LeftL.prototype.rotateLeft = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	LeftL.prototype.rotateRight = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	module.exports = LeftL;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Piece = __webpack_require__(4);
	var colorConstants = __webpack_require__(5);
	
	var RightL = function RightL(board) {
	  Piece.call(this, board);
	  this.color = colorConstants.PURPLE;
	  this.location = [[120, -120], [120, -90], [120, -60], [150, -60]];
	  this.name = "RightL";
	};
	
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	RightL.prototype = new Surrogate();
	RightL.prototype.rotateRight = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	RightL.prototype.rotateLeft = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	module.exports = RightL;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Piece = __webpack_require__(4);
	var colorConstants = __webpack_require__(5);
	
	var LeftZ = function LeftZ(board) {
	  Piece.call(this, board);
	  this.color = colorConstants.YELLOW;
	  this.location = [[90, -90], [120, -90], [120, -60], [150, -60]];
	  this.name = "LeftZ";
	};
	
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	LeftZ.prototype = new Surrogate();
	LeftZ.prototype.rotateLeft = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	LeftZ.prototype.rotateRight = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	module.exports = LeftZ;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Piece = __webpack_require__(4);
	var colorConstants = __webpack_require__(5);
	
	var RightZ = function RightZ(board) {
	  Piece.call(this, board);
	  this.color = colorConstants.ORANGE;
	  this.location = [[150, -90], [120, -90], [120, -60], [90, -60]];
	  this.name = "RightZ";
	};
	
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	RightZ.prototype = new Surrogate();
	RightZ.prototype.rotateRight = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	RightZ.prototype.rotateLeft = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      case 3:
	        rotation = 60;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //DISTANCE BLOCK
	    //==============
	
	    //block is bottom left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is top left
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      continue;
	    }
	
	    //block is top right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is bottom right
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	module.exports = RightZ;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Piece = __webpack_require__(4);
	var colorConstants = __webpack_require__(5);
	
	var Tee = function Tee(board) {
	  Piece.call(this, board);
	  this.color = colorConstants.PINK;
	  this.location = [[120, -90], [120, -60], [150, -60], [90, -60]];
	  this.name = "Tee";
	};
	
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	Tee.prototype = new Surrogate();
	Tee.prototype.rotateLeft = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	Tee.prototype.rotateRight = function (paused) {
	  if (paused) return;
	  var originBlock = this.location[1];
	  var originalLocation = [[], [], [], []];
	  for (var k = 0; k < this.location.length; k++) {
	    for (var l = 0; l < 2; l++) {
	      originalLocation[k][l] = this.location[k][l];
	    }
	  }
	
	  for (var i = 0; i < this.location.length; i++) {
	    var rotation = void 0;
	    switch (i) {
	      case 1:
	        rotation = 0;
	        break;
	      default:
	        rotation = 30;
	    }
	
	    //block is above originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30) {
	      this.location[i][0] += rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	    //block is to right of originBlock
	    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] += rotation;
	      continue;
	    }
	
	    //block is below originBlock
	    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] + 30) {
	      this.location[i][0] -= rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	
	    //block is to left of originBlock
	    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1]) {
	      this.location[i][0] += rotation;
	      this.location[i][1] -= rotation;
	      continue;
	    }
	  }
	
	  for (var j = 0; j < this.location.length; j++) {
	    if (this.isSpaceTaken(this.location[j])) {
	      this.location = originalLocation;
	    }
	  }
	};
	module.exports = Tee;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	var GameView = function GameView(game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	};
	
	GameView.MOVES = {
	  'a': 'left',
	  's': 'down',
	  'd': 'right'
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  var _this = this;
	
	  if (this.game.menu === 'main') {
	    key('s', function () {
	      _this.game.removeMainMenu();
	    });
	  }
	
	  Object.keys(GameView.MOVES).forEach(function (k) {
	    var direction = GameView.MOVES[k];
	    key(k, function () {
	      _this.game.pieces[_this.game.pieces.length - 1].move(direction);
	    });
	  });
	  key('r', function () {
	    _this.replay();
	  });
	  key('p', function () {
	    _this.game.togglePause();
	  });
	  key('q', function () {
	    _this.game.pieces[_this.game.pieces.length - 1].rotateLeft(_this.game.paused);
	  });
	  key('e', function () {
	    _this.game.pieces[_this.game.pieces.length - 1].rotateRight(_this.game.paused);
	  });
	};
	
	GameView.prototype.replay = function () {
	  if (this.game.menu !== 'over') return;
	  this.game.reset(this.ctx);
	};
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	  this.lastTime = 0;
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function (time) {
	  var timeDelta = time - this.lastTime;
	
	  this.game.step(timeDelta, this.ctx);
	  this.game.draw(this.ctx);
	  this.lastTime = time;
	
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map