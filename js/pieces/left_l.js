const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const LeftL = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.GREEN;
  this.location = [
    [120, -90, 0, -2],
    [120, -60, 0, -1],
    [120, -30, 0, 0],
    [90, -30, -1, 0]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
LeftL.prototype = new Surrogate();

module.exports = LeftL;
