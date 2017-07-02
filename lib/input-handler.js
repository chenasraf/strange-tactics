import Sprite from './sprite'
import { h, w } from './game-settings'

class InputHandler {
  constructor() {
    this._boundEvents = {}
    this._clickHoldCounter = 0
    this._wasClicking = false

    for (let e of 'click hold drag mouseEnter mouseLeave'.split(' ')) {
      this._boundEvents[e] = []
    }
  }

  on(name, cb, options = {}) {
    if (!(typeof cb === 'function'))
      throw new TypeError('Callback must be a function')

    if (!(name in this._boundEvents))
      throw new TypeError(`Event name must be one of: ${Object.keys(this._boundEvents).join(', ')}`)

    let clickArea = options.clickArea
    let idx = this._boundEvents[name].findIndex((x) => {
      return x.z > options.z
    })

    idx = Math.max(idx - 1, 0)

    this._boundEvents[name].splice(idx, 0, {
      clickArea,
      callback: cb,
      z: options.z || 10
    })
  }

  off(name, cb) {
    if (!(typeof cb === 'function'))
      throw new TypeError('Callback must be a function')

    if (!(name in this._boundEvents))
      throw new TypeError(`Event name must be one of: ${Object.keys(this._boundEvents).join(', ')}`)

    let idx = this._boundEvents[name].findIndex((x) => x.callback == cb)

    if (idx > -1) {
      this._boundEvents[name].splice(idx, 1)
      return true
    }

    return false
  }

  update() {
    if (!this._interacting) {
      if (mouseIsPressed) {
        if (!this._startedClick) {
          this._startedClick = true
          this._mouseStartX = mouseX
          this._mouseStartY = mouseY
          this._wasClicking = false
          this._clickHoldCounter = 0
        } else {
          this._wasClicking = true
          this._clickHoldCounter += 1
        }
      } else {
        if (this._startedClick) {
          this._startedClick = false
          this._mouseEndX = mouseX
          this._mouseEndY = mouseY
          this._interacting = true
          let evName = 'click'

          if (this._clickHoldCounter > 300)
            evName = 'hold'

          if (Math.abs(this._mouseStartX - this.mouseEndX) > 10 ||
            Math.abs(this._mouseStartY - this.mouseEndY) > 10)
            evName = 'drag'

          this.dispatchEvent('click')

          setTimeout(() => {
            this._interacting = false
          }, 300)
        }

        this._startedClick = false
        this._wasClicking = false
        this._clickHoldCounter = 0
      }
    }
  }

  dispatchEvent(evName) {
    if (this._boundEvents[evName].length)
      for (let ev of this._boundEvents[evName]) {
        let res, clickArea = ev.clickArea
        if (this.isMouseOver(clickArea))
          res = ev.callback()

        if (res === false)
          break
      }
  }

  isMouseOver(clickArea) {
    if (!clickArea) return false

    if (typeof clickArea === 'function')
      clickArea = clickArea()

    if (!(Number.isFinite(clickArea.x) &&
        Number.isFinite(clickArea.y) &&
        Number.isFinite(clickArea.w) &&
        Number.isFinite(clickArea.h)))
      throw new Error("Sprite click area is invalid.")

    return mouseX > 0 && mouseY > 0 &&
      mouseX < w && mouseY < h &&
      mouseX >= clickArea.x &&
      mouseX < clickArea.x + clickArea.w &&
      mouseY >= clickArea.y &&
      mouseY < clickArea.y + clickArea.w
  }
}

export default new InputHandler()
