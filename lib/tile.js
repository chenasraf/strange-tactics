class Tile extends Sprite {
	constructor(i, j, img, hoverImg) {
    super(i, j)
		this.img = img
		this.hoverImg = hoverImg
		this.hoverImg.filter(GRAY)
	}

	show() {
		rect(this.x, this.y, this.w, this.w)
		strokeWeight(2)
		stroke(177, 218, 131, 90)
		fill(187, 241, 126)
		image(this.mouseOver() ? this.hoverImg : this.img, this.x, this.y, this.w, this.w)
	}
}
