const w = 720,
  h = 480,
  gridSize = 48,
  partySize = 5,
  cols = Math.floor(w / gridSize),
  rows = Math.floor(h / gridSize)

let tiles, party
let grassTile, grassHoverTile, chars, hoverChars

function index(i, j) {
	return i + j * cols
}


function preload() {
  grassTile = loadImage('images/tiles/medievalTile_58.png')
  grassHoverTile = loadImage('images/tiles/medievalTile_58.png')
  chars = new Array(partySize)
  hoverChars = new Array(partySize)

  for (let i = 0; i < chars.length; i++) {
    let img = `images/chars/medievalUnit_${("0"+(i+1)).slice(-2)}.png`
    chars[i] = loadImage(img)
    hoverChars[i] = loadImage(img)
  }
}


function setup() {
  createCanvas(w, h)
  background(0)

  tiles = new Array(cols * rows)
  party = new Array(partySize)

  for (let i = 0; i < party.length; i++) {
    party[i] = new Character(floor(random(cols)), floor(random(rows)), gridSize, gridSize, {
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


function draw() {
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
  text(`x${mouseX.toFixed(2)}y${mouseY.toFixed(2)}`, 3, 10)
}
