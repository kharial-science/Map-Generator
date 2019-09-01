import _ from 'lodash'

function expand(map) {
    let newMap = _.cloneDeep(map)
    let x = 0
    for (let row of map) {
        let y = 0
        for (let chunk of row) {
            if (chunk && chunk.status === 'expanding') {
                let directChunksRelative = [[1, 0], [0, 1], [-1, 0], [0, -1]]
                let diagChunksRelative = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
                directChunksRelative.forEach(relativeCoords => {
                    if(Math.random() <= 0.75) {
                        if (x + relativeCoords[0] >= 0 && x + relativeCoords[0] < map.length && y + relativeCoords[1] >= 0 && y + relativeCoords[1] < map.length) {
                            if(!newMap[x + relativeCoords[0]][y + relativeCoords[1]] || !newMap[x + relativeCoords[0]][y + relativeCoords[1]].biome) {
                                try {
                                    newMap[x + relativeCoords[0]][y + relativeCoords[1]] = {
                                        biome: map[x][y].biome.slice(),
                                        status: 'expanding'
                                    }
                                } catch (e) {}
                            }
                        }
                    }
                    newMap[x][y].status = 'done'
                })
                diagChunksRelative.forEach(relativeCoords => {
                    if(Math.random() <= 0.3) {
                        if (x + relativeCoords[0] >= 0 && x + relativeCoords[0] < map.length && y + relativeCoords[1] >= 0 && y + relativeCoords[1] < map.length) {
                            if(!newMap[x + relativeCoords[0]][y + relativeCoords[1]] || !newMap[x + relativeCoords[0]][y + relativeCoords[1]].biome) {
                                try {
                                    newMap[x + relativeCoords[0]][y + relativeCoords[1]] = {
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

function generate (size = 40, type='chunkArray', availableBiomes = ['ocean', 'ocean', 'ocean', 'plains', 'plains', 'plains']) {

    let row = new Array(size).fill(null);
    let map = new Array(size).fill(null).map(() => row.slice());

    while (availableBiomes.length >= 1) {
        let {x, y} = findRandomChunk(size);
        map[x][y] = {
            biome: availableBiomes.pop(),
            status: 'expanding',
        }
    }

    if (type === 'map') return map;
    return concatenateMap(map);
}

function isNullChunkInMap(map) {
    for (let row of map) {
        for(let chunk of row) {
            if (!chunk) {
                return true
            }
        }
    }
    return false
}

function findRandomChunk(size) {
    const x = Math.floor(Math.random() * size)
    const y = Math.floor(Math.random() * size)
    return {x, y}
}

function concatenateMap(nestedArrays) {
    let concatenatedArray = []
    concatenatedArray = concatenatedArray.concat(...nestedArrays)
    return concatenatedArray
}

//const chunkArray = ['ocean', 'ocean', 'plains', 'plains']
export { concatenateMap, generate, expand }

