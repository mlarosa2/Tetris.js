const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const LeftL = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.GREEN;
  this.location = [
    [120, -90, 0, -1],
    [120, -60, 0, 0],
    [120, -30, 0, 0],
    [90, -30, -1, 1]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
LeftL.prototype = new Surrogate();
LeftL.prototype.rotateLeft = function() {
  for (let i = 0; i < this.location.length; i++) {
    if (i === 2) continue;
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] - 30)) {
      this.location[i][0] += 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] - 60)) {
      this.location[i][0] += 60;
      this.location[i][1] += 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] -= 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] + 30) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] -= 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] + 60) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] -= 60;
      this.location[i][1] += 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] -= 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] + 30)) {
      this.location[i][0] -= 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] + 60)) {
      this.location[i][0] -= 60;
      this.location[i][1] -= 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] += 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] - 30) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] += 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] - 60) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] += 60;
      this.location[i][1] -= 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] += 60;
        break;
      };
      continue;
    }
  }
};
LeftL.prototype.rotateRight = function () {
  for (let i = 0; i < this.location.length; i++) {
    if (i === 2) continue;
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] - 30)) {
      this.location[i][0] -= 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] - 60)) {
      this.location[i][0] -= 60;
      this.location[i][1] += 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] -= 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] - 30) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] += 30;
      this.location[i][1] += 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] -= 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] - 60) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] += 60;
      this.location[i][1] += 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] -= 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] + 30)) {
      this.location[i][0] += 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === this.location[2][0] && this.location[i][1] === (this.location[2][1] + 60)) {
      this.location[i][0] += 60;
      this.location[i][1] -= 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] -= 60;
        this.location[i][1] += 60;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] + 30) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] -= 30;
      this.location[i][1] -= 30;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 30;
        this.location[i][1] += 30;
        break;
      };
      continue;
    }
    if (this.location[i][0] === (this.location[2][0] + 60) && this.location[i][1] === this.location[2][1]) {
      this.location[i][0] -= 60;
      this.location[i][1] -= 60;
      if (this.checkBlockLeft(this.location[i])) {
        this.location[i][0] += 60;
        this.location[i][1] += 60;
        break;
      };
      continue;
    }
  }
};
module.exports = LeftL;
