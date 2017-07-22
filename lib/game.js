const SETTINGS = require('./game-settings')
const Tile = require('./tile')
const Character = require('./character')
const InputHandler = require('./input-handler')
const Assets = require('./assets')
new p5()

let assetStorage = {
    partyImages: new Array(SETTINGS.partySize)
  },
  party = new Array(SETTINGS.partySize),
  tiles = new Array(SETTINGS.cols * SETTINGS.rows)

window.preload = function() {
  assetStorage.grassTile = loadImage(Assets.tiles.grass.normal)
  assetStorage.grassHoverTile = loadImage(Assets.tiles.grass.hover)

  for (let i = 0; i < party.length; i++) {
    assetStorage.partyImages[i] = loadImage(Assets.chars[i])
  }
}

window.setup = function() {
  window.__gidinc = 0
  createCanvas(SETTINGS.w, SETTINGS.h)
  background(0)

  for (let i = 0; i < party.length; i++) {
    party[i] = new Character({
      i: floor(random(SETTINGS.cols)),
      j: floor(random(SETTINGS.rows)),
      w: SETTINGS.gridSize - 8,
      h: SETTINGS.gridSize,
      img: assetStorage.partyImages[i]
    })
  }

  for (let i = 0; i < SETTINGS.cols; i++) {
    for (let j = 0; j < SETTINGS.rows; j++) {
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
  fill(0, 0, 0, 50)
  rect(1, 1, 80, 20)

  fill(255)
  textSize(12)
  let x = mouseX.toFixed(2).replace('.00', ''),
    y = mouseY.toFixed(2).replace('.00', ''),
    i = floor(x / SETTINGS.gridSize),
    j = floor(y / SETTINGS.gridSize)

  text(`x${x} y${y} i${i} j${j}`, 3, 12)
}
