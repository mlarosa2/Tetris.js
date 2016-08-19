const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const LeftZ = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.YELLOW;
  this.location = [
    [90, -60],
    [120, -60],
    [120, -30],
    [150, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
LeftZ.prototype = new Surrogate();

module.exports = LeftZ;
