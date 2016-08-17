const Game     = require('./game');
const GameView = require('./game_view');
const Board = require('./board');

document.addEventListener("DOMContentLoaded", function () {
  const canvas  = document.getElementById('canvas');
  canvas.width  = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const ctx  = canvas.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
});
