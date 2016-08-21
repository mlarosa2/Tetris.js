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
  this.name = "RightL";
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
RightL.prototype = new Surrogate();
RightL.prototype.rotateRight = function(paused) {
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
      case 3:
        rotation = 60;
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

    //DISTANCE BLOCK
    //==============

    //block is bottom left
    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
      this.location[i][1] -= rotation;
      continue;
    }

    //block is bottom right
    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
      this.location[i][0] -= rotation;
      continue;
    }

    //block is top right
    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
      this.location[i][1] += rotation;
      continue;
    }

    //block is top left
    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
      this.location[i][0] += rotation;
      continue;
    }
  }

  for (let j = 0; j < this.location.length; j++) {
    if (this.isSpaceTaken(this.location[j])) {
      this.location = originalLocation;
    }
  }
};
RightL.prototype.rotateLeft = function (paused) {
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
      case 3:
        rotation = 60;
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

    //DISTANCE BLOCK
    //==============

    //block is bottom left
    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] + 30) {
      this.location[i][0] += rotation;
      continue;
    }

    //block is top left
    if (this.location[i][0] === originBlock[0] - 30 && this.location[i][1] === originBlock[1] - 30) {
      this.location[i][1] += rotation;
      continue;
    }

    //block is top right
    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] - 30) {
      this.location[i][0] -= rotation;
      continue;
    }

    //block is bottom right
    if (this.location[i][0] === originBlock[0] + 30 && this.location[i][1] === originBlock[1] + 30) {
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
module.exports = RightL;
