function createAvailableBiomesArray(biomeObjArray) {
    let avaiableBiomes = []
    biomeObjArray.forEach(biomeObj => {
        for (let i = 0; i < parseInt(biomeObj.number, 10); i++) {
            avaiableBiomes.push(biomeObj.name)
        }
    })
    return avaiableBiomes
}

export default createAvailableBiomesArray