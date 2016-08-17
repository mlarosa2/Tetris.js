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

	const Game     = __webpack_require__(1);
	const GameView = __webpack_require__(2);
	const Board = __webpack_require__(3);
	
	document.addEventListener("DOMContentLoaded", function () {
	  const canvas  = document.getElementById('canvas');
	  canvas.width  = Game.DIM_X;
	  canvas.height = Game.DIM_Y;
	  const ctx  = canvas.getContext("2d");
	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);
	const Square = __webpack_require__(4);
	
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const GameView = function (game, ctx) {
	  this.ctx = ctx;
	  this.game = game;
	};
	
	GameView.prototype.start = function() {
	  this.lastTime = 0;
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function(time) {
	  const timeDelta = time - this.lastTime;
	
	  this.game.step(timeDelta);
	  this.game.draw(this.ctx);
	  this.lastTime = time
	
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Piece          = __webpack_require__(5);
	const colorConstants = __webpack_require__(6);
	
	const Square = function () {
	  Piece.call(this);
	  this.color = colorConstants.RED;
	  this.location = [
	    [8, 0],
	    [9, 0],
	    [8, 1],
	    [9, 1]
	  ];
	}
	
	function Surrogate() {};
	Surrogate.prototype = Piece.prototype;
	Square.prototype = new Surrogate();
	
	module.exports = Square;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	const colorConstants = {
	  RED    : '#F00',
	  BLUE   : '#00F',
	  GREEN  : '#0F0',
	  YELLOW : '#FFFF00',
	  PURPLE : '#551A8B',
	  ORANGE : '#FFA500'
	}
	
	module.exports = colorConstants;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map