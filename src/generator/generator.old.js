const app = require('express')()
const http = require('http').createServer(app)
const Enmap = require('enmap')
const fs = require('fs')

/*
    1.  Generating biome array
    2.  Generating map
    ..  ...

*/

//  1.  Generating biome array

var size = 100
// Generating the map
function generate (size) {
  const map = new Enmap({ 0: [] })
  class Chunk {
    constructor (x, y, height, owner = undefined, building = undefined) {
      this.x = x
      this.y = y
      this.height = height
      this.biome = biome[height]
      this.owner = owner
      this.building = building
    };
  };
  // Generating the array containing all biomes
  const biome = []
  const coef = 2 * 10 ** 5
  for (let i = 0; i < 50 * coef; i++) {
    biome.push('ocean')
  };

  for (let i = 0; i < 15 * coef; i++) {
    biome.push('sea')
  };

  for (let i = 0; i < 20 * coef; i++) {
    biome.push('seabord')
  };

  for (let i = 0; i < 75 * coef; i++) {
    biome.push('plains')
  };

  for (let i = 0; i < 50 * coef; i++) {
    biome.push('pastures')
  };

  for (let i = 0; i < 25 * coef; i++) {
    biome.push('highMountain')
  };
  // Calculating the biome of the first Chunk (0;0)
  map.set(0, [new Chunk(-1 * size / 2, -1 * size / 2, Math.round(biome.length / 4 + Math.round(Math.random() * (3.15 * size ** 3) - 1.575 * size ** 3)))])
  // calculating the biomes of the first row
  for (let i = 1; i <= size; i++) {
    x = map.get(0)
    x.push(new Chunk(i - size / 2, -1 * size / 2, Math.round(x[i - 1].height + Math.round(Math.random() * (3.15 * size ** 3) - 1.575 * size ** 3))))
    map.set(0, x)
  };
  // calculating the biomes of the first column
  for (let i = 1; i <= size; i++) {
    map.set(i, [])
    y = map.get(i)
    y.push(new Chunk(-1 * size / 2, i - size / 2, Math.round(map.get(i - 1)[0].height + Math.round(Math.random() * (3.15 * size ** 3) - 1.575 * size ** 3))))
    map.set(i, y)
  }
  // calculating the biomes of all others Chunks
  for (let i = 1; i <= size; i++) {
    console.log(i)
    y = map.get(i)
    for (let j = 1; j <= size; j++) {
      const coef1 = Math.round(Math.random() * 10)
      let ChunkLoading = new Chunk(i - size / 2, j - size / 2, Math.round(Math.round((coef1 * y[j - 1].height + (10 - coef1) * map.get(i - 1)[j].height) / 10)))
      y.push(ChunkLoading)
    }
    map.set(i, y)
  };
  return map
};

console.log('Fini')
http.listen(3000, function () {
  console.log('listening on *:3000')
})
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.html')
})

app.get('/style.css', function (req, res) {
  res.sendFile(__dirname + '/' + 'style.css')
})

app.get('/index.js', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.js')
})

export default generate
