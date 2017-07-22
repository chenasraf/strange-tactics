const Sprite = require('./sprite')
const MovementTile = require('./movement-tile')

/**
 * Represents a moveable character with a sprite
 * @extends {Sprite}
 * @param {int} i - grid I value
 * @param {int} j - grid J value
 * @param {d.Image} j - image to use as sprite
 */
class Character extends Sprite {
  constructor(options = {}) {
    super(options.i, options.j)
    this.w = options.w
    this.h = options.h
    this.img = options.img
    this.movementR = 3
    this.movementVisible = false
    this.speed = 10
    this.spriteSlice = options.spriteSlice || [44, 36, 36, 52]
    this.clickPropagates = false
  }

  show() {
    super.show()
    image(this.img, ...this._getPos(), ...this.spriteSlice)

    textSize(14)
    text(`i${parseInt(this.i)} j${parseInt(this.j)}`, this.x + 3, this.y + this.h + 12)
  }

  __moveToRandom() {
    this.moveTo(floor(random(cols)), floor(random(rows)))
  }

  update() {
    super.update()
  }

  onClick() {
    this._toggleMovementGrid()
  }

  _getPos() {
    return [this.x + 2, this.y, this.w, this.h]
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
    this._circleGridCache.length = 0
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
    let out = []
    console.debug(`Drawing grid on ${j}, from ${startI} to ${endI}`)

    for (let curI = startI; curI < endI; curI++) {
      out.push(new MovementTile(curI, j, {
        character: this
      }))
    }

    return out
  }

  _toggleMovementGrid() {
    this.movementVisible = !this.movementVisible
  }
}

module.exports = Character
