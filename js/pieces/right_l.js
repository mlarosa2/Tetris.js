const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const RightL = function () {
  Piece.call(this);
  this.color = colorConstants.PURPLE;
  this.location = [
    [120, -90],
    [120, -60],
    [120, -30],
    [150, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
RightL.prototype = new Surrogate();

module.exports = RightL;
