const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const RightL = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.PURPLE;
  this.location = [
    [120, -90],
    [120, -60],
    [120, -30],
    [150, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
RightL.prototype = new Surrogate();
RightL.prototype.rotateLeft = function () {
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
RightL.prototype.rotateRight = function() {
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
module.exports = RightL;
