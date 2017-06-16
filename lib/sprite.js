const INTERACTION_INTERVAL = 50
const MIN_INTERACTION_HOLDING = INTERACTION_INTERVAL * 2

class Sprite {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.x = i * gridSize
    this.y = j * gridSize
    this.w = gridSize
    this.speed = 1
    this._destI = this._destJ = null
    this._circleGridCache = []
    this.control = {
      active: false,
      continuous: false,
      holdTime: 0,
    }
  }

  _spriteImage(img) {
    this.img = img
  }

  mouseOver() {
    return mouseX > 0 && mouseY > 0 &&
      mouseX < w && mouseY < h &&
      mouseX >= this.x &&
      mouseX < this.x + this.w &&
      mouseY >= this.y &&
      mouseY < this.y + this.w
  }

  moveTo(i, j) {
    this._destX = i * gridSize
    this._destY = j * gridSize
  }

  _doMovement() {
    let diffX = Math.abs(this.x - this._destX),
      diffY = Math.abs(this.y - this._destY),
      dirX = (this.x > this._destX ? -1 : 1),
      dirY = (this.y > this._destY ? -1 : 1)

    this.i = this.x / gridSize
    this.j = this.y / gridSize

    if (diffX < 1 && diffY < 1) {
      this.x = this._destX
      this.y = this._destY
      this._destX = this._destY = null
      return
    }

    if (diffX > 0)
      this.x += Math.min(this.speed, diffX - 1) * dirX
    if (diffY > 0)
      this.y += Math.min(this.speed, diffY - 1) * dirY
  }

  show() {
    if (this.movementGridVisible)
      this.drawCircleGrid(this.movementR)
  }

  update() {
    this._doMovement()

    if (typeof this.onClick === 'function') {
      if (this.mouseIsClicking()) {
        this._startInteraction()
        this.onClick()
      }
    }
  }

  drawCircleGrid(r) {
    if (this._circleGridCache.length) {
      for (let tile of this._circleGridCache) {
        tile.show()
        tile.update()
      }
    } else {
      this._calcCircleGrid(r)
    }
  }

  _calcCircleGrid(r) {
    let i = r,
      j = 0,
      err = 1 - i,
      cache = {}

    while (i >= j) {

      let startI = -i + this.i,
        endI = i + this.i + 1

      this._circleGridCache.push(...this.drawHorizontalLineGrid(startI, endI, j + this.j))

      if (j != 0)
        this._circleGridCache.push(...this.drawHorizontalLineGrid(startI, endI, -j + this.j))

      j++

      if (err < 0)
        err += 2 * j + 1
      else {
        if (i >= j) {
          startI = -j + 1 + this.i
          endI = j + this.i
          this._circleGridCache.push(...this.drawHorizontalLineGrid(startI, endI, i + this.j))
          this._circleGridCache.push(...this.drawHorizontalLineGrid(startI, endI, -i + this.j))
        }
        i--
        err += 2 * (j - i + 1)
      }
    }
  }

  drawHorizontalLineGrid(startI, endI, j) {
    let circleColor = color(30, 167, 255, 100),
      out = []

    for (let curI = startI; curI < endI; curI++) {
      let tile = new Tile(curI, j, {
        color: circleColor,
        stroke: false
      })
      out.push(tile)
    }

    return out
  }

  mouseIsClicking() {
    return !this.control.active && mouseIsPressed && this.mouseOver() && !this.control.continuous
  }

  mouseIsHolding(immediate = true) {
    return !this.control.active && mouseIsPressed && this.mouseOver() && (immediate && true || this.continuous)
  }

  _startInteraction() {
    this.control.active = Boolean(mouseIsPressed && this.mouseOver())
    this.control.continuous = false
    this.interactionInterval = setInterval(() => this._endInteraction(), INTERACTION_INTERVAL)
  }

  _endInteraction() {
    this.control.active = Boolean(mouseIsPressed && this.mouseOver())

    if (this.control.active) {
      this.control.holdTime += INTERACTION_INTERVAL
      this.control.continuous = this.control.holdTime >= MIN_INTERACTION_HOLDING
    } else {
      clearInterval(this.interactionInterval)
      this.control.holdTime = 0
      this.control.continuous = false
    }
  }

  _toggleMovementGrid() {
    this.movementGridVisible = !this.movementGridVisible
  }
}
