const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const RightZ = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.ORANGE;
  this.location = [
    [150, -60, -1, -1],
    [120, -60, 0, -1],
    [120, -30, 0, 0],
    [90, -30, -1, 0]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
RightZ.prototype = new Surrogate();

module.exports = RightZ;
