const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Square = function () {
  Piece.call(this);
  this.color = colorConstants.RED;
  this.location = [
    [8, 0],
    [9, 0],
    [8, 1],
    [9, 1]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Square.prototype = new Surrogate();

module.exports = Square;
