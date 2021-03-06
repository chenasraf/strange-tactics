import Sprite from './sprite'
import { cols } from './game-settings'

class Tile extends Sprite {
  constructor(i, j, options = {}) {
    super(i, j)

    this.img = options.img
    this.stroke = options.stroke || [177, 218, 131, 90]
    this.color = options.color
    this._isMouseOver = false
    this.z = 0

    if (this.hoverImg)
      this.hoverImg.filter(GRAY)
  }

  show() {
    super.show()

    if (this.color) {
      fill(this.color)
      rect(this.x, this.y, this.w, this.w)

      if (this.stroke) {
        strokeWeight(2)
        stroke(...this.stroke)
      }

    } else {
      image(this._isMouseOver ? this.hoverImg : this.img, this.x, this.y, this.w, this.w)
    }

    if (this.highlighted) {
      rect(this.x, this.y)
    }
  }

  static indexOf(i, j) {
    return i + j * cols
  }
}

export default Tile
