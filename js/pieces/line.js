const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const Line = function () {
  Piece.call(this);
  this.color = colorConstants.BLUE;
  this.location = [
    [120, -120],
    [120, -90],
    [120, -60],
    [120, -30]
  ];
}

function Surrogate() {};
Surrogate.prototype = Piece.prototype;
Line.prototype = new Surrogate();

module.exports = Line;
