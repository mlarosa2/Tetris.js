const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Tee = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.PINK;
  this.location = [
    [120, -90],
    [120, -60],
    [150, -60],
    [90, -60]
  ];
  this.name = "Tee";
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Tee.prototype = new Surrogate();
Tee.prototype.rotateLeft = function(paused) {
  if (paused) return;
  const originBlock      = this.location[1];
  const originalLocation = [[], [], [], []];
  for (let k = 0; k < this.location.length; k++) {
    for (let l = 0; l < 2; l++) {
      originalLocation[k][l] = this.location[k][l];
    }
  }

  for (let i = 0; i < this.location.length; i ++) {
    let rotation;
    switch (i) {
      case 1:
        rotation = 0;
        break;
      default:
        rotation = 30;
    }

    //block is above originBlock
    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30 ) {
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

  for (let j = 0; j < this.location.length; j++) {
    if (this.isSpaceTaken(this.location[j])) {
      this.location = originalLocation;
    }
  }
};
Tee.prototype.rotateRight = function (paused) {
  if (paused) return;
  const originBlock      = this.location[1];
  const originalLocation = [[], [], [], []]
  for (let k = 0; k < this.location.length; k++) {
    for (let l = 0; l < 2; l++) {
      originalLocation[k][l] = this.location[k][l];
    }
  }

  for (let i = 0; i < this.location.length; i ++) {
    let rotation;
    switch (i) {
      case 1:
        rotation = 0;
        break;
      default:
        rotation = 30;
    }

    //block is above originBlock
    if (this.location[i][0] === originBlock[0] && this.location[i][1] === originBlock[1] - 30 ) {
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

  for (let j = 0; j < this.location.length; j++) {
    if (this.isSpaceTaken(this.location[j])) {
      this.location = originalLocation;
    }
  }
};
module.exports = Tee;
