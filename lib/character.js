class Character extends Sprite {
	constructor(i, j, img, hoverImg) {
		super(i, j, i * gridSize, i * gridSize, gridSize, gridSize, img, hoverImg)
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
		if (this.mouseIsClicking()) {
			this._startInteraction()
			this._toggleMovementGrid()
		}
	}

	move(i, j) {
		this.i = i
		this.j = j
	}

	_toggleMovementGrid() {
		this.movementGridVisible = !this.movementGridVisible
	}
}
