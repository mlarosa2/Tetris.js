const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const LeftL = function () {
  Piece.call(this);
  this.color = colorConstants.GREEN;
  this.location = [
    [120, -90],
    [120, -60],
    [120, -30],
    [90, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
LeftL.prototype = new Surrogate();

module.exports = LeftL;
