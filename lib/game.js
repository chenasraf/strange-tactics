console.log("HELP!")
import { w, h, gridSize, partySize, cols, rows, tiles, party } from './game-settings'
import Tile from './tile'
import Character from './character'
import InputHandler from './input-handler'

function game(p) {
  let grassTile, grassHoverTile, chars, hoverChars
  let tiles, party

  function index(i, j) {
    return i + j * cols
  }

  p.preload = function() {
    grassTile = p.loadImage('images/tiles/medievalTile_58.png')
    grassHoverTile = p.loadImage('images/tiles/medievalTile_58.png')
    chars = new Array(partySize)
    hoverChars = new Array(partySize)

    for (let i = 0; i < chars.length; i++) {
      let img = `images/chars/medievalUnit_${("0"+(i+1)).slice(-2)}.png`
      chars[i] = p.loadImage(img)
      hoverChars[i] = p.loadImage(img)
    }
  }

  p.setup = function() {
    p.createCanvas(w, h)
    p.background(0)

    tiles = new Array(cols * rows)
    party = new Array(partySize)

    for (let i = 0; i < party.length; i++) {
      party[i] = new Character(p.floor(p.random(cols)), p.floor(p.random(rows)), gridSize - 8, gridSize, {
        img: chars[i]
      })
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        tiles[index(i, j)] = new Tile(i, j, {
          img: grassTile,
          hoverImg: grassHoverTile
        })
      }
    }
  }

  p.draw = function() {
    InputHandler.update()
    for (let tile of tiles) {
      tile.show()
    }
    for (let char of party) {
      char.show()
      char.update()
    }

    // ellipse(p.mouseX, p.mouseY, 10)
    // fill(255, 255, 255, 100)
    p.fill(0)
    p.textSize(12)
    p.text(`x${p.mouseX.toFixed(2)}y${p.mouseY.toFixed(2)}`, 3, 10)
  }
}

export default new p5(game)
