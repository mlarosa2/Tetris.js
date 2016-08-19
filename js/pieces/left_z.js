const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const LeftZ = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.YELLOW;
  this.location = [
    [90, -60, 0, -2],
    [120, -60, 0, -1],
    [120, -30, 0, 0],
    [150, -30, 1, 0]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
LeftZ.prototype = new Surrogate();

module.exports = LeftZ;
