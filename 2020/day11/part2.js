const path = require('path')
const readFile = require('../../utils/read-file')

const unOccupied = 'L'
const occupied = '#'

const modelSeats = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const floorPlan = data.toString().trim().split('\n').map(x => x.split(''))
  const finalOccupied = simulate(floorPlan)
  console.log(finalOccupied)
}

const simulate = (floorPlan) => {
  let totalOccupied = 0
  let noChange = false

  while (!noChange) {
    const copyPlan = JSON.parse(JSON.stringify(floorPlan))
    for (let i = 0; i < floorPlan.length; i++) {
      for (let j = 0; j < floorPlan[i].length; j++) {
        let numberOfNeighbours = 0
        const directions = [
          { x: 1, y: 0 }, { x: -1, y: 0 },
          { x: 1, y: 1 }, { x: -1, y: -1 },
          { x: 1, y: -1 }, { x: -1, y: 1 },
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ]
        for (let k = 0; k < directions.length; k++) {
          let posX = j + directions[k].x
          let posY = i + directions[k].y
          let seatFound = false
          while (!seatFound && posX >= 0 && posY >= 0 && posX < floorPlan[i].length && posY < floorPlan.length) {
            if (floorPlan[posY][posX] === occupied) {
              numberOfNeighbours++
              seatFound = true
              break
            }
            if (floorPlan[posY][posX] === unOccupied) {
              seatFound = true
              break
            }
            posX += directions[k].x
            posY += directions[k].y
          }
        }

        if (floorPlan[i][j] === unOccupied && numberOfNeighbours === 0) {
          copyPlan[i][j] = occupied
        } else if (floorPlan[i][j] === occupied && numberOfNeighbours >= 5) {
          copyPlan[i][j] = unOccupied
        }
      }
    }
    totalOccupied = copyPlan.reduce((x, y) => x + y.filter(z => z === occupied).length, 0)
    noChange = JSON.stringify(floorPlan) === JSON.stringify(copyPlan)
    floorPlan = JSON.parse(JSON.stringify(copyPlan))
  }
  return totalOccupied
}

(async function () {
  await modelSeats()
}())
