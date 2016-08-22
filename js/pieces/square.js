const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Square = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.RED;
  this.location = [
    [150, -60],
    [120, -60],
    [150, -90],
    [120, -90]
  ];
  this.name = "Square";
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Square.prototype = new Surrogate();

module.exports = Square;
