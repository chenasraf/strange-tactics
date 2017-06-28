import Sprite from './sprite'
import p from './game'

class Tile extends Sprite {
  constructor(i, j, options = {}) {
    super(i, j)
    this.img = options.img
    this.hoverImg = options.hoverImg
    this.stroke = options.stroke || [177, 218, 131, 90]
    this.color = options.color
    this._isMouseOver = false
    this.z = 0

    if (this.hoverImg)
      this.hoverImg.filter(p.GRAY)
  }

  show() {
    super.show()

    if (this.color) {
      p.fill(this.color)
      p.rect(this.x, this.y, this.w, this.w)

      if (this.stroke) {
        p.strokeWeight(2)
        p.stroke(...this.stroke)
      }

    } else {
      p.image(this._isMouseOver ? this.hoverImg : this.img, this.x, this.y, this.w, this.w)
    }
  }
}

export default Tile
