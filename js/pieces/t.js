const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Tee = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.PINK;
  this.location = [
    [120, -60],
    [150, -30],
    [120, -30],
    [90, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Tee.prototype = new Surrogate();

module.exports = Tee;
