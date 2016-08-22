const Game     = require('./game');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function () {
  const canvas  = document.getElementById('canvas');
  canvas.width  = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const ctx     = canvas.getContext("2d");
  const game    = new Game();
  new GameView(game, ctx).start();
});

window.replay = function () {
  const canvas  = document.getElementById('canvas');
  canvas.width  = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const ctx     = canvas.getContext("2d");
  const game    = new Game();
  new GameView(game, ctx).start();
};


let mute  = document.getElementById("volume");
let audio = document.getElementById("theme");

mute.addEventListener('click', function () {
  if (!audio.paused) {
    mute.innerHTML = '<span class="fa-stack"><i class="fa fa-music fa-stack-1x"></i><i class="fa fa-ban fa-stack-1x"></i></span>&nbsp;&nbsp;Unmute</span>'
    mute.className = 'muted'
    audio.pause();
  } else {
    mute.innerHTML = '<i class="fa fa-music"></i>&nbsp;&nbsp;Mute';
    mute.className = '';
    audio.play();
  }
});
