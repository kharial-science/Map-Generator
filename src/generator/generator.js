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
  const map = new Enmap({ 0: [] })
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

/*
    const map = new Enmap({0:[]});
    map.set(0,[new Chunk(-1*size/2,-1*size/2,Math.floor(biome.length/2 + Math.floor(Math.random()* size **(size-70) - size**(size-70)/2)))]);

    for(let i=1 ; i<=size ; i++){
        x=map.get(0);
        x.push(new Chunk(i-size/2,-1*size/2, Math.floor(x[i-1].height + Math.floor(Math.random()*size ** (size-70)-size ** (size-70)/2))));
        map.set(0,x);
    };

    for(let i = 1 ; i <= size ; i++){
        map.set(i, []);
        y = map.get(i);
        y.push(new Chunk(-1*size/2, i-size/2, Math.floor(map.get(i-1)[0].height + Math.floor(Math.random()*(size-70) -size * (size - 70)/2))));
        map.set(i, y);
    }
    for(let i = 1 ; i <= size ; i++){
        console.log(i);
        y=map.get(i);
        for(let j = 1 ; j <= size ; j++){
            coef1 = Math.floor(Math.random()*10);
            ChunkLoading = new Chunk(i-size/2, j-size/2, Math.floor(Math.sqrt((Math.floor((coef1*y[j-1].height + (10-coef1)*map.get(i-1)[j].height)/10))**2)));
            y.push(ChunkLoading);
        }
        map.set(i,y);
    };
    return map;
};
*/
/*
mapGenerated = generate(size)

// Generating the HTML (add react.js)
function creatingHTML (map) {
  // let mapHTML = "<!DOCTYPE html><html><head><meta charset='UTF-8'><link rel='stylesheet' href='/styles.css' /><title>Map</title></head><body>";
  let mapHTML = "<!DOCTYPE html><html><head><meta charset='UTF-8'><link rel='stylesheet' href='/styles.css' /><title>Map</title></head><body>"
  for (let i = 0; i <= size; i++) {
    console.log(i)
    mapHTML += "<div class = 'column'>"
    for (let j = 0; j <= size; j++) {
      mapHTML += "<div id = '" + map.get(i)[j].x + ' ' + map.get(i)[j].y + "' class = '" + map.get(i)[j].biome + "'" + "title = '" + map.get(i)[j].x + ' ' + map.get(i)[j].y + '' + map.get(i)[j].height + "'></div>"
    };
    mapHTML += '</div>'
  }

  mapHTML += '</body></html>'
  return mapHTML
}

fs.openSync('index.html', 'w+')
fs.writeFileSync('index.html', creatingHTML(mapGenerated))
fs.closeSync(0)

console.log('Fini')
http.listen(3000, function () {
  console.log('listening on *:3000')
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.html')
  console.log(mapGenerated.get(0))
})
app.get('/styles.css', function (req, res) {
  res.sendFile(__dirname + '/' + 'styles.css')
})

/*
fs.unlink('index.html', (err) => {
    console.log('successfully deleted /tmp/hello');
  });

fs.open('index.html', 'wx', (err) => {
    writeMyData("<!DOCTYPE html><html><head><meta charset='UTF-8'><link rel='stylesheet' href='/styles.css' /><title>Map</title></head><body>");
});
for(let i=0 ; i<=size ; i++){
    for(let j = 0 ; j<=size ; j++){
        fs.write("<div id = '"+map.get(i)[j].x + " " + map.get(i)[j].y+"' class = '" + map.get(i)[j].biome+" ></div>");
    };
}
fs.appendFile('index.html', "</body></html>", (err) => {
          });

*/
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
