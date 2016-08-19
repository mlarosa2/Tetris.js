const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Square = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.RED;
  this.location = [
    [150, -30, 0, 0],
    [120, -30, 0, 0],
    [150, -60, 0, 0],
    [120, -60, 0, 0]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Square.prototype = new Surrogate();

module.exports = Square;
