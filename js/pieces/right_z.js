const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const RightZ = function () {
  Piece.call(this);
  this.color = colorConstants.YELLOW;
  this.location = [
    [150, -60],
    [120, -60],
    [120, -30],
    [90, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
RightZ.prototype = new Surrogate();

module.exports = RightZ;
