const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Tee = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.PINK;
  this.location = [
    [120, -60],
    [120, -30],
    [150, -30],
    [90, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Tee.prototype = new Surrogate();
Tee.prototype.rotateLeft = function () {
  for (let i = 0; i < this.location.length; i++) {
    if (i === 1) continue;
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] - 30)) {
      this.location[i][0] -= 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] -= 30;
        break;
      }
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] - 30) && this.location[i][1] === this.location[1][1]) {
      this.location[i][0] += 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] -= 30;
        break;
      }
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] + 30)) {
      this.location[i][0] += 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] += 30;
        break;
      }
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] + 30) && this.location[i][1] === this.location[1][1]) {
      this.location[i][0] -= 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] += 30;
        break;
      }
      continue;
    }
  }
};
Tee.prototype.rotateRight = function() {
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
    if (this.location[i][0] === (this.location[1][0] + 30) && this.location[i][1] === this.location[1][1]) {
      this.location[i][0] -= 30;
      this.location[i][1] += 30;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] -= 30;
        break;
      }
      continue;
    }
    if (this.location[i][0] === this.location[1][0] && this.location[i][1] === (this.location[1][1] + 30)) {
      this.location[i][0] -= 30;
      this.location[i][1] -= 30;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] += 30;
        break;
      }
      continue;
    }
    if (this.location[i][0] === (this.location[1][0] - 30) && this.location[i][1] === this.location[1][1]) {
      this.location[i][0] += 30;
      this.location[i][1] -= 30;
      if (this.checkBlockRight(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] += 30;
        break;
      }
      continue;
    }
  }
};
module.exports = Tee;
