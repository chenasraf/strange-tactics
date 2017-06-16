class Tile extends Sprite {
	constructor(i, j, w, img, hoverImg) {
    super(i, j, i * gridSize, i * gridSize, gridSize, gridSize, img, hoverImg)
	}

	show() {
		rect(this.x, this.y, this.w, this.w)
		strokeWeight(2)
		stroke(177, 218, 131, 90)
		fill(187, 241, 126)
		image(this.mouseOver() ? this.hoverImg : this.img, this.x, this.y, this.w, this.w)
	}
}
