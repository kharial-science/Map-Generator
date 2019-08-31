function generate (size = 100, type='chunkArray') {

    let row = new Array(size).fill(null);
    let map = new Array(size).fill(null).map(() => row.slice());
    let availableBiomes = ['ocean', 'ocean', 'ocean', 'plains', 'plains', 'plains'];

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
export { concatenateMap, generate }

