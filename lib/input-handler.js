import p from './game'
import Sprite from './sprite'
import {
  h,
  w
} from './game-settings'

class InputHandler {
  constructor() {
    this._boundEvents = {}
    this._clickHoldCounter = 0
    this._wasClicking = false

    for (let e of 'click hold drag hover'.split(' ')) {
      this._boundEvents[e] = []
    }
  }

  on(self, name, cb) {
    if (!(typeof cb === 'function'))
      throw new TypeError('callback must be ')

    if (!(name in this._boundEvents))
      throw new TypeError(`event name must be one of: ${Object.keys(this._boundEvents).join(', ')}`)

    let idx = this._boundEvents[name].findIndex((x) => {
      return x.self && x.self.z !== undefined && x.self.z > x.self.z
    })

    idx = idx >= 0 ? idx : this._boundEvents[name].length - 1

    this._boundEvents[name].splice(idx, 0, {
      self,
      callback: cb
    })
  }

  update() {
    if (!this._interacting) {
      if (p.mouseIsPressed) {
        if (!this._startedClick) {
          this._startedClick = true
          this._wasClicking = false
          this._clickHoldCounter = 0
        } else {
          this._wasClicking = true
          this._clickHoldCounter += 1
        }
      } else {
        if (this._startedClick) {
          this._startedClick = false
          this._interacting = true
          let evName = 'click'

          if (this._clickHoldCounter > 300)
            evName = 'hold'

          if (this._boundEvents[evName].length)
            for (let ev of this._boundEvents[evName]) {
              let res
              if (this.isMouseOver(ev.self))
                res = ev.callback()

              if (res === false)
                break
            }

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

  isMouseOver(obj) {
    return p.mouseX > 0 && p.mouseY > 0 &&
      p.mouseX < w && p.mouseY < h &&
      p.mouseX >= obj.x &&
      p.mouseX < obj.x + obj.w &&
      p.mouseY >= obj.y &&
      p.mouseY < obj.y + obj.w
  }
}

export default new InputHandler()
