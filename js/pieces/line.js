const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Line = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.BLUE;
  this.location = [
    [120, -120],
    [120, -90],
    [120, -60],
    [120, -30]
  ];
}
function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Line.prototype = new Surrogate();

Line.prototype.rotateLeft = function () {
  for (let i = 0; i < this.location.length; i++) {
    if (i === 1) continue;
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] - 30)) {

      this.location[i][0] -= 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] - 60)) {

      this.location[i][0] -= 60;
      this.location[i][1] += 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] -= 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] - 30) && this.location[i][1] === this.location[1][1]) {

      this.location[i][0] += 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] - 60) && this.location[i][1] === this.location[1][1]) {

      this.location[i][0] += 60;
      this.location[i][1] += 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] + 30)) {

      this.location[i][0] += 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] + 60)) {

      this.location[i][0] += 60;
      this.location[i][1] -= 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] += 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] + 30) && this.location[i][1] === this.location[1][1]) {

      this.location[i][0] -= 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] + 60) && this.location[i][1] === this.location[1][1]) {

      this.location[i][0] -= 60;
      this.location[i][1] -= 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
  }
};

Line.prototype.rotateRight = function() {
  for (let j = 0; j < this.location.length; j++) {
    if (this.location[j][0] <= 0 || this.checkColLeft()) {
      return;
    }
  }
  for (let i = 0; i < this.location.length; i++) {
    if (i === 1) continue;
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] - 30)) {

      this.location[i][0] += 30;
      this.location[i][1] += 30;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] - 60)) {

      this.location[i][0] += 60;
      this.location[i][1] += 60;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] -= 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] + 30) && this.location[i][1] === this.location[1][1]) {

      this.location[i][0] -= 30;
      this.location[i][1] += 30;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] + 60) && this.location[i][1] === this.location[1][1]) {

      this.location[i][0] -= 60;
      this.location[i][1] += 60;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] -= 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] + 30)) {
      this.location[i][0] -= 30;
      this.location[i][1] -= 30;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] + 60)) {
      this.location[i][0] -= 60;
      this.location[i][1] -= 60;

      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] += 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] - 30) && this.location[i][1] === this.location[1][1]) {
      this.location[i][0] += 30;
      this.location[i][1] -= 30;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] - 60) && this.location[i][1] === this.location[1][1]) {
      this.location[i][0] += 60;
      this.location[i][1] -= 60;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] += 60;
        break;
      };
      continue;
    }
  }
};

module.exports = Line;
