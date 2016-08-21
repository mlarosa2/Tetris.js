const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
};

GameView.MOVES = {
  "a" : "left",
  "s" : "down",
  "d" : "right",
};

GameView.prototype.bindKeyHandlers = function () {
  Object.keys(GameView.MOVES).forEach( k => {
    let direction = GameView.MOVES[k];
    key(k, () => { this.game.pieces[this.game.pieces.length - 1].move(direction); });
  });

  key("q", () => { this.game.pieces[this.game.pieces.length - 1].rotateLeft(this.ctx); });
  key("e", () => { this.game.pieces[this.game.pieces.length - 1].rotateRight(this.ctx); });
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
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
