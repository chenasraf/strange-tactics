import Tile from './tile'

let Tile2 = Tile

export default class MovementTile extends Tile2 {
  constructor(i, j, options = {}) {
    // super(i, j, {
    //   color: color(30, 167, 255, 70),
    //   stroke: false
    // })

    this.character = options.character
    this.tileTest = new Tile(0, 1, { color: color(0) })
  }

  show() {
    this.tileTest.show()
  }
  update() {}

  onClick() {
    this.character.moveTo(this.i, this.j)
    this.destroy()
  }
}
