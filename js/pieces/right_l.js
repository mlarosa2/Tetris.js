const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const RightL = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.PURPLE;
  this.location = [
    [120, -90, 0, -2],
    [120, -60, 0, -1],
    [120, -30, 0, 0],
    [150, -30, 1, 1]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
RightL.prototype = new Surrogate();

module.exports = RightL;
