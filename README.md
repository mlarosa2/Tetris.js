# Tetris.js

A browser Tetris game implemented with vanilla JavaScript and the HTML5 Canvas API.

[Play Now!](http://www.marklarosa.me/tetris.html)

## Controls:

  * "a" move block left
  * "s" move block down
  * "d" move block right
  * "q" rotate counter clockwise
  * "e" rotate clockwise
  * "p" pauses game

## Screenshots

![playing]  ![game-over]


[playing]: ./playing.png
[game-over]: ./gameover.png

## Technical Challenges

The board for this game is represented by a three-dimensional array called boardAsArray. However, in
order to have smooth falling animation, the pieces' locations are calculated at the
pixel level, as opposed to simply moving the piece to a new location in boardAsArray
every animation frame. This means that while confirming a piece is in bounds and cannot move farther
to the left or right can be calculated by simply looking at the location of the
piece's blocks on the x-axis, checking to make sure the columns to the left and
the right of the piece is a bit more involved.

Each block on the falling piece must have its location calculated and then converted into a position
in boardAsArray. This is done by dividing the location of the piece by 30 and then
rounding up with Math.ceil. From here, depending on if we are checking the column
to the left or the right of the piece, we can subtract 1 or add 1 to the columnLeft or
columnRight variables respectively. To check if the piece is in bounds and to keep it in bounds,
if either the column(Left/Right) or the row variables are outside the bounds, they are set to the bounds
minimum or maximum values.

The initial functioning version of Piece.checkColLeft and Piece.checkColRight
used Math.floor instead of Math.ceil to calculate the row and column. This resulted
in abnormal behavior for Tetris. Given a set block to the left of the falling piece's block
and the falling piece's block's y-coordinate was between the middle and top of the
set block, the piece would go up and be set on top of the already set piece. Using Math.ceil
reversed this behavior, thus mimicking how a normal game of Tetris behaves.

```JavaScript
Piece.prototype.checkColLeft = function () {
  for (let i = 0; i < this.location.length; i++) {
    let columnLeft  = Math.ceil(this.location[i][0] / 30) - 1;
    let row         = Math.ceil(this.location[i][1] / 30);
    columnLeft < 0 ? columnLeft = 0 : columnLeft;
    row < 0 ? row = 0 : row;
    if (this.board[row][columnLeft].length > 0) {
      return true;
    }
  }

  return false;
};
```

```JavaScript
Piece.prototype.checkColRight = function () {
  for (let i = 0; i < this.location.length; i++) {
    let columnRight = Math.ceil(this.location[i][0] / 30) + 1;
    let row         = Math.ceil(this.location[i][1] / 30);
    columnRight > 9 ? columnRight = 9 : columnRight;
    row < 0 ? row = 0 : row;
    if (this.board[row][columnRight].length > 0) {
      return true;
    }
  }

  return false;
};
```
