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
  let previousOccupiedSeats = 0
  let noChange = false

  while (!noChange) {
    let totalOccupied = 0
    for (let i = 0; i < floorPlan.length; i++) {
      for (let j = 0; j < floorPlan[i].length; j++) {
        if (floorPlan[i][j] === unOccupied && floorPlan[i][j - 1] === unOccupied && floorPlan[i][j + 1] === unOccupied && floorPlan[i + 1][j] === unOccupied && floorPlan[i - 1][j] === unOccupied) {
          floorPlan[i][j] = occupied
          totalOccupied += 1
        } else if (floorPlan[i][j] === occupied && floorPlan[i][j - 1] === occupied && floorPlan[i][j + 1] === occupied && floorPlan[i + 1][j] === occupied && floorPlan[i - 1][j] === occupied) {
          floorPlan[i][j] = unOccupied
        }
      }
    }
    noChange = previousOccupiedSeats === totalOccupied
    previousOccupiedSeats = totalOccupied
  }
  return previousOccupiedSeats
}

(async function () {
  await modelSeats()
}())
