import { w, h, cols, rows, gridSize, partySize } from './game-settings'
import Tile from './tile'
import Character from './character'
import InputHandler from './input-handler'
import Assets from './assets'
new p5()

let assetStorage = {
    partyImages: new Array(partySize)
  },
  party = new Array(partySize),
  tiles = new Array(cols * rows)

window.preload = function() {
  assetStorage.grassTile = loadImage(Assets.tiles.grass.normal)
  assetStorage.grassHoverTile = loadImage(Assets.tiles.grass.hover)

  for (let i = 0; i < party.length; i++) {
    assetStorage.partyImages[i] = loadImage(Assets.chars[i])
  }
}

window.setup = function() {
  window.__gidinc = 0
  createCanvas(w, h)
  background(0)

  for (let i = 0; i < party.length; i++) {
    party[i] = new Character({
      i: floor(random(cols)),
      j: floor(random(rows)),
      w: gridSize - 8,
      h: gridSize,
      img: assetStorage.partyImages[i]
    })
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      tiles[Tile.indexOf(i, j)] = new Tile(i, j, {
        img: assetStorage.grassTile,
        hoverImg: assetStorage.grassHoverTile
      })
    }
  }
}

window.draw = function() {
  InputHandler.update()

  for (let tile of tiles) {
    tile.show()
  }

  for (let char of party) {
    char.show()
    char.update()
  }

  // ellipse(mouseX, mouseY, 10)
  // fill(255, 255, 255, 100)
  fill(0)
  textSize(12)
  let x = mouseX.toFixed(2).replace('.00', ''),
    y = mouseY.toFixed(2).replace('.00', ''),
    i = floor(x / gridSize),
    j = floor(y / gridSize)

  text(`x${x} y${y} i${i} j${j}`, 3, 12)
}
