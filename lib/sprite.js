const INTERACTION_INTERVAL = 50
const MIN_INTERACTION_HOLDING = INTERACTION_INTERVAL * 2
/**
* Base class for objects on screen.
* @param {number} i Sprite's grid X
* @param {number} j Sprite's grid Y
* @property {number} x X position ons screen, calculated with gridSize
* @property {number} y Y position ons screen, calculated with gridSize
* @property {number} w Sprite width
* @property {number} speed How many pixels per frame to move when told to
*/
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

  /**
  Returns true if the mouse is positioned inside the boundaries of the sprite.
  @return {boolean}
  */
  isMouseOver() {
    return mouseX > 0 && mouseY > 0 &&
      mouseX < w && mouseY < h &&
      mouseX >= this.x &&
      mouseX < this.x + this.w &&
      mouseY >= this.y &&
      mouseY < this.y + this.w
  }

  /**
  * Tells the sprite to move to [i, j] on the grid.
  * @param {number} i Grid X to move to
  * @param {number} j Grid Y to move to
  * @see {@link Sprite#_doMovement}
  */
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

  /**
  * Shows the sprite. For clarity and organization sake, this should only include
  * things relating to sprite looks & display, not for movement or other actions.
  * When you override this method, don't forget to call `super.show()`
  * @see {@link Sprite#update}
  */
  show() {
    if (this.movementGridVisible)
      this.drawCircleGrid(this.movementR)
  }

  /**
  * Updates the sprite. Most logic should be inside this method, and should not
  * include drawing functions. To draw, you should use {@link Sprite#update|update()} to enable a flag
  * which {@link Sprite#show|show()} displays.
  * @see {@link Sprite#show}
  */
  update() {
    this._doMovement()

    if (typeof this.onClick === 'function') {
      if (this.isMouseClicking()) {
        this._startInteraction()
        this.onClick()
      }
    }
  }

  /**
  * Draw a circle around the character using the grid.
  * @param {number} r Radius to draw around the character (in grid blocks)
  */
  drawCircleGrid(r) {
    if (this._circleGridCache.length && this._circleGridRadius == r) {
      for (let tile of this._circleGridCache) {
        tile.show()
        tile.update()
      }
    } else {
      this._calcCircleGrid(r)
    }
  }

  _calcCircleGrid(r) {
    this._circleGridCache = []
    this._circleGridRadius = r

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

  /**
  * Draw a horizontal line using grid tiles
  * @param {number} startI Grid X to start from
  * @param {number} endI Grid X to end on
  * @param {number} j Grid Y to draw on
  * @return {Array.<Tile>} Tiles created
  */
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

  /**
  * Returns true if the mouse is currently clicking while positioned on the sprite
  * @see {@link Sprite#isMouseHolding}
  * @return {boolean} Mouse is currently clicking
  */
  isMouseClicking() {
    return !this.control.active && mouseIsPressed && this.isMouseOver() && !this.control.continuous
  }

  /**
  * Returns true if the mouse is currently being held clicked while positioned on the sprite.
  * Being held is defined by clicking for over 100ms continuously.
  * @return {boolean} Mouse is currently being held beyond 100ms
  */
  isMouseHolding(immediate = true) {
    return !this.control.active && mouseIsPressed && this.isMouseOver() && (immediate && true || this.continuous)
  }

  _startInteraction() {
    this.control.active = Boolean(mouseIsPressed && this.isMouseOver())
    this.control.continuous = false
    this.interactionInterval = setInterval(() => this._endInteraction(), INTERACTION_INTERVAL)
  }

  _endInteraction() {
    this.control.active = Boolean(mouseIsPressed && this.isMouseOver())

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
