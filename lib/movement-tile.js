const Tile = require('./tile')

class MovementTile extends Tile {
  constructor(i, j, options = {}) {
    super(i, j, {
      color: color(30, 167, 255, 70),
      stroke: false
    })

    this.character = options.character
  }

  onClick() {
    this.character.moveTo(this.i, this.j)
    this.destroy()
  }
}

module.exports = MovementTile
