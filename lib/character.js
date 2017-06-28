import Sprite from './sprite'
import p from './game'

/**
 * Represents a moveable character with a sprite
 * @extends {Sprite}
 * @param {int} i - grid I value
 * @param {int} j - grid J value
 * @param {d.Image} j - image to use as sprite
 */
class Character extends Sprite {
  constructor(i, j, w, h, options = {}) {
    super(i, j)
    this.w = w
    this.h = h
    this.z = 10
    this.img = options.img
    this.movementR = 3
    this.movementGridVisible = false
    this.speed = 10
    this.spriteSlice = options.spriteSlice || [44, 36, 36, 52]
    this.clickPropagates = false
  }

  show() {
    super.show()
    p.image(this.img, ...this._getPos(), ...this.spriteSlice)
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
}

export default Character
