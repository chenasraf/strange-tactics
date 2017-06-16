class Tile extends Sprite {
  constructor(i, j, options = {}) {
    super(i, j)
    this.img = options.img
    this.hoverImg = options.hoverImg
    this.stroke = options.stroke || [177, 218, 131, 90]
    this.color = options.color

    if (this.hoverImg)
      this.hoverImg.filter(GRAY)
  }

  show() {
    if (this.color) {
			fill(this.color)
      rect(this.x, this.y, this.w, this.w)

			if (this.stroke) {
	      strokeWeight(2)
	      stroke(...this.stroke)
			}

    } else {
      image(this.mouseOver() ? this.hoverImg : this.img, this.x, this.y, this.w, this.w)
    }
  }
}
