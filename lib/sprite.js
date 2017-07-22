const INTERACTION_INTERVAL = 50
const MIN_INTERACTION_HOLDING = INTERACTION_INTERVAL * 2
const SETTINGS = require('./game-settings')
const InputHandler = require('./input-handler')

/**
 * Base class for objects on screen.
 * @param {number} i Sprite's grid X
 * @param {number} j Sprite's grid Y
 * @property {number} x X position ons screen, calculated with SETTINGS.gridSize
 * @property {number} y Y position ons screen, calculated with SETTINGS.gridSize
 * @property {number} w Sprite width
 * @property {number} speed How many pixels per frame to move when told to
 */
class Sprite {
  constructor(i, j) {
    this.__id = window.__gidinc++
    this.i = i
    this.j = j
    this.x = i * SETTINGS.gridSize
    this.y = j * SETTINGS.gridSize
    this.w = SETTINGS.gridSize
    this.speed = 1
    this._destI = this._destJ = null
    this._circleGridCache = []
    this.clickDisabled = false
    this.clickPropagates = true
    this.control = {
      active: false,
      continuous: false,
      holdTime: 0,
    }
    this._events = {
      click: () => this._onClick(),
      mouseEnter: () => this._highlight(true),
      mouseLeave: () => this._highlight(false)
    }
    this.visible = true

    for (let evName in this._events)
      if (this._events.hasOwnProperty(evName))
        InputHandler.on(evName, this._events[evName], {
          clickArea: () => this.clickArea(),
          z: 20
        })
  }

  _spriteImage(img) {
    this.img = img
  }

  _onClick() {
    console.log('on click firing', this)
    if (typeof this.onClick === 'function' && this.visible) {
      this.onClick(...arguments)
    }

    if (!this.clickPropagates)
      return false

    return true
  }

  _highlight(state) {
    if (state === undefined)
      state = true // !this.highlighted

    return this.highlighted = state
  }

  destroy() {
    for (let evName in this._events)
      if (this._events.hasOwnProperty(evName))
        InputHandler.off(evName, this._events[evName])
  }

  /**
   * Tells the sprite to move to [i, j] on the grid.
   * @param {number} i Grid X to move to
   * @param {number} j Grid Y to move to
   * @see {@link Sprite#_doMovement}
   */
  moveTo(i, j) {
    this._destX = i * SETTINGS.gridSize
    this._destY = j * SETTINGS.gridSize
    this.movementVisible = false
  }

  _doMovement() {
    if (!(this._destX || this._destY))
      return

    let diffX = Math.abs(this.x - this._destX),
      diffY = Math.abs(this.y - this._destY),
      dirX = (this.x > this._destX ? -1 : 1),
      dirY = (this.y > this._destY ? -1 : 1)

    if (diffX < 1 && diffY < 1) {
      console.log({
        diffX,
        diffY
      })
      this.clickDisabled = false
      this.x = this._destX
      this.y = this._destY
      this.i = this.x / SETTINGS.gridSize
      this.j = this.y / SETTINGS.gridSize
      this._destX = this._destY = null
      return
    } else {
      this.clickDisabled = true
    }

    if (diffX > 0)
      this.x += Math.min(this.speed, diffX - 0.1) * dirX
    if (diffY > 0)
      this.y += Math.min(this.speed, diffY - 0.1) * dirY
  }

  /**
   * Shows the sprite. For clarity and organization sake, this should only include
   * things relating to sprite looks & display, not for movement or other actions.
   * When you override this method, don't forget to call `super.show()`
   * @see {@link Sprite#update}
   */
  show() {
    if (this.movementVisible)
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
  }

  clickArea() {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.w
    }
  }
}

module.exports = Sprite
