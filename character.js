class Character extends Sprite {
	constructor(i, j, img, hoverImg) {
		super(i, j, i * gridSize, i * gridSize, 32, 32, img, hoverImg)
		this.movementR = 3
		this.movementGridVisible = false
	}

	show() {
		let img = this.mouseOver() ? this.hoverImg : this.img
		image(img, this.x + 2, this.y, this.w - 8, this.h, 44, 40, 36, 50)
		if (this.movementGridVisible) {
			this.drawCircleGrid(this.movementR)
		}
	}

	update() {
		if (mouseIsPressed && this.mouseOver() && !this.controlActive) {
			this.controlActive = true
			this._toggleMovementGrid()
			setTimeout(() => this.controlActive = false, 100)
		}
	}

	move(i, j) {
		this.i = i
		this.j = j
	}

	drawCircleGrid(r) {
		let d = (5 - r * 4) / 4,
			x = 0,
			y = r * gridSize,
			circleColor = color(255, 255, 255, 100)

		do {
			fill(circleColor)
			rect(this.x + x, this.y + y, gridSize, gridSize)
			rect(this.x + x, this.y - y, gridSize, gridSize)
			rect(this.x - x, this.y + y, gridSize, gridSize)
			rect(this.x - x, this.y - y, gridSize, gridSize)
			rect(this.x + y, this.y + x, gridSize, gridSize)
			rect(this.x + y, this.y - x, gridSize, gridSize)
			rect(this.x - y, this.y + x, gridSize, gridSize)
			rect(this.x - y, this.y - x, gridSize, gridSize)

			if (d < 0) {
				d += 2 * x + gridSize
			} else {
				d += 2 * (x - y) + gridSize
				y -= gridSize
			}
			x += gridSize
		} while (x <= y)
	}
	_toggleMovementGrid() {
		this.movementGridVisible = !this.movementGridVisible
	}
}
