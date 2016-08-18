const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Square = function () {
  Piece.call(this);
  this.color = colorConstants.RED;
  this.location = [
    [150, -30],
    [120, -30],
    [150, -60],
    [120, -60]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Square.prototype = new Surrogate();

module.exports = Square;
