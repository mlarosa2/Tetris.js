const Piece          = require('./piece');
const colorConstants = require('./color_constants');

const RightZ = function (board) {
  Piece.call(this, board);
  this.color = colorConstants.ORANGE;
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

RightZ.prototype.rotateLeft = function () {

};

RightZ.prototype.rotateRight = function() {

};
module.exports = RightZ;
