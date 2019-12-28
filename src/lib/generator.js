import _ from 'lodash'

function expand (map, options) {
  const newMap = _.cloneDeep(map)
  let x = 0
  for (const row of map) {
    let y = 0
    for (const chunk of row) {
      if (chunk && chunk.status === 'expanding') {
        const chunkRelatives = [
          [-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2],
          [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2],
          [0, -2], [0, -1], /* [0, 0], */ [0, 1], [0, 2],
          [1, -2], [1, -1], [1, 0], [1, 1], [1, 2],
          [2, -2], [2, 1], [2, 0], [2, 1], [2, 2]
        ]

        Object.entries(options).filter(entry => entry[1] > 0).forEach(entry => {
          if (Math.random() <= entry[1]) {
            if (x + chunkRelatives[entry[0]][0] >= 0 && x + chunkRelatives[entry[0]][0] < map.length && y + chunkRelatives[entry[0]][1] >= 0 && y + chunkRelatives[entry[0]][1] < map.length) {
              if (!newMap[x + chunkRelatives[entry[0]][0]][y + chunkRelatives[entry[0]][1]] || !newMap[x + chunkRelatives[entry[0]][0]][y + chunkRelatives[entry[0]][1]].biome) {
                try {
                  newMap[x + chunkRelatives[entry[0]][0]][y + chunkRelatives[entry[0]][1]] = {
                    biome: map[x][y].biome.slice(),
                    status: 'expanding'
                  }
                } catch (e) {}
              }
            }
          }
          newMap[x][y].status = 'done'
        })
      }
      y++
    }
    x++
  }
  return newMap
}

function generate (size = 40, type = 'chunkArray', availableBiomes = ['ocean', 'ocean', 'ocean', 'plains', 'plains', 'plains']) {
  const row = new Array(size).fill(null)
  const map = new Array(size).fill(null).map(() => row.slice())

  while (availableBiomes.length >= 1) {
    const { x, y } = findRandomChunk(size)
    map[x][y] = {
      biome: availableBiomes.pop(),
      status: 'expanding'
    }
  }

  if (type === 'map') return map
  return concatenateMap(map)
}

function fix (map) {
  const newMap = _.cloneDeep(map)
  let x = 0
  for (const row of map) {
    let y = 0
    for (const chunk of row) {
      if (!chunk) {
        const directChunksRelative = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        const directBiomes = []
        directChunksRelative.forEach(coords => {
          try {
            if (map[x + coords[0]][y + coords[1]].biome) {
              directBiomes.push(map[x + coords[0]][y + coords[1]].biome)
            }
          } catch (e) {}
        })
        if (directBiomes[0]) {
          newMap[x][y] = {
            biome: directBiomes[Math.floor(Math.random() * directBiomes.length)],
            status: 'done'
          }
        }
      }
      y++
    }
    x++
  }

  return newMap
}

function isNullChunkInMap (map) {
  for (const row of map) {
    for (const chunk of row) {
      if (!chunk) {
        return true
      }
    }
  }
  return false
}

function findRandomChunk (size) {
  const x = Math.floor(Math.random() * size)
  const y = Math.floor(Math.random() * size)
  return { x, y }
}

function concatenateMap (nestedArrays) {
  let concatenatedArray = []
  concatenatedArray = concatenatedArray.concat(...nestedArrays)
  return concatenatedArray
}

export { concatenateMap, generate, expand, fix }
