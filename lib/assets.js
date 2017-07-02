export default {
  tiles: {
    grass: {
      normal: 'images/tiles/medievalTile_58.png',
      hover: 'images/tiles/medievalTile_58.png'
    }
  },
  chars: (c => {
    let imgs = []
    for (let i = 0; i < c; i++)
      imgs.push(`images/chars/medievalUnit_${("0"+(i+1)).slice(-2)}.png`)
    return imgs
  })(24)
}
