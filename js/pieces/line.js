const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Line = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.BLUE;
  this.location = [
    [120, -120, -2, -2],
    [120, -90, -1, -1],
    [120, -60, 0, 0],
    [120, -30, 1, 1]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Line.prototype = new Surrogate();

module.exports = Line;
