const INTERACTION_INTERVAL = 50
const MIN_INTERACTION_HOLDING = INTERACTION_INTERVAL * 2

class Sprite {
  static get INTERACTION_INTERVAL() { return INTERACTION_INTERVAL }
  static get MIN_INTERACTION_HOLDING() { return MIN_INTERACTION_HOLDING }

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
    this.circleGridCache = {}
    this.control = {
      active: false,
      continuous: false,
      holdTime: 0,
    }
  }

  mouseOver() {
    return mouseX > 0 && mouseY > 0 &&
      mouseX < w && mouseY < h &&
      mouseX >= this.x &&
      mouseX < this.x + this.w &&
      mouseY >= this.y &&
      mouseY < this.y + this.w
  }

  drawCircleGrid(r) {
    let i = r,
      j = 0,
      err = 1 - i,
      circleColor = color(30, 167, 255, 100),
      cache = {}

    // if (r > 0)
    //   this.drawCircleGrid(r - 1)

    while (i >= j) {
      fill(circleColor)

      let startI = -i + this.i,
        endI = i + this.i + 1

      this.drawHorizontalLineGrid(startI, endI, j + this.j)

      if (j != 0)
        this.drawHorizontalLineGrid(startI, endI, -j + this.j)

      j++

      if (err < 0)
        err += 2 * j + 1
      else {
        if (i >= j) {
          startI = -j + 1 + this.i
          endI = j + this.i
          this.drawHorizontalLineGrid(startI, endI, i + this.j)
          this.drawHorizontalLineGrid(startI, endI, -i + this.j)
        }
        i--
        err += 2 * (j - i + 1)
      }
    }
  }

  drawHorizontalLineGrid(startI, endI, j) {
    console.debug('line from', startI, 'to', endI, 'on', j)
    for (let curI = startI; curI < endI; curI++)
      rect(curI * gridSize, j * gridSize, gridSize, gridSize)
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

    console.debug('_startInteraction', this.control)
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

    console.debug('_endInteraction', this.control)
  }
}
