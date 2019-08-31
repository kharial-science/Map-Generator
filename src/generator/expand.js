function expand(map) {
    for (let row of map) {
        let y = 0
        for (let chunk of row) {
            if (chunk && chunk.status === 'expanding') {
                let directChunksRelative = [[1, 0], [0, 1], [-1, 0], [0, -1]]
                let diagChunksRelative = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
                directChunksRelative.forEach(relativeCoords => {
                    if(Math.random() <= 0.75) {
                        try {
                            map[x + relativeCoords[0]][y + relativeCoords[1]] = Object.assign(map[x][y])
                        } catch (e) {}
                    }
                    //map[x][y].status = 'done'
                })
                diagChunksRelative.forEach(relativeCoords => {
                    if(Math.random() <= 0.3) {
                        try {
                            map[x + relativeCoords[0]][y + relativeCoords[1]] = Object.assign(map[x][y])
                        } catch (e) {}
                    }
                    //map[x][y].status = 'done'
                })
            }
            y++
        }
    x++
    }
}

export default expand