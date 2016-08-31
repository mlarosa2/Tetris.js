const GameView = function (game, ctx) {
  this.ctx = ctx;
  this.game = game;
};

GameView.MOVES = {
  'a' : 'left',
  's' : 'down',
  'd' : 'right',
};


GameView.prototype.bindKeyHandlers = function () {
  if (this.game.menu === 'main') {
    key('s', () => { this.game.removeMainMenu(); });
  }

  Object.keys(GameView.MOVES).forEach( k => {
    let direction = GameView.MOVES[k];
    key(k, () => { this.game.pieces[this.game.pieces.length - 1].move(direction); });
  });
  key('r', () => { this.replay(); });
  key('p', () => { this.game.togglePause(); });
  key('q', () => { this.game.pieces[this.game.pieces.length - 1].rotateLeft(this.game.paused); });
  key('e', () => { this.game.pieces[this.game.pieces.length - 1].rotateRight(this.game.paused); });
};

GameView.prototype.replay = function () {
  if (this.game.menu !== 'over') return;
  this.game.reset(this.ctx);
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.lastTime = 0;
  const dbRefObject = firebase.database().ref();

  dbRefObject.on("value", function(snapshot) {
    let list = document.getElementById("hi-list");
    let scoreLi = "";
    if (snapshot.val()) {
      let scores = snapshot.val().scores;
      for (let score in scores) {
        if (scores.hasOwnProperty(score)) {
          let initials = Object.keys(scores[score])[0];
          scoreLi += "<li>";
          scoreLi += `${initials}:${scores[score][initials]}`;
          scoreLi += "</li>";
        }
      }
    }
    list.innerHTML = scoreLi;
  });

  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time) {
  const timeDelta = time - this.lastTime;

  this.game.step(timeDelta, this.ctx);
  this.game.draw(this.ctx);
  this.lastTime = time

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
