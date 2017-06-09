class Sprite {
  constructor(i, j, x, y, w, h, img, hoverImg) {
    this.i = i
    this.j = j
    this.x = i * gridSize
    this.y = j * gridSize
    this.w = w
    this.h = h
    this.img = img
    this.hoverImg = hoverImg
    this.hoverImg.filter(GRAY)
  }

	mouseOver() {
		return mouseX > 0 && mouseY > 0 &&
			mouseX < w && mouseY < h &&
			mouseX >= this.x &&
			mouseX < this.x + this.w &&
			mouseY >= this.y &&
			mouseY < this.y + this.w
	}
}
