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
        const neighbours = []
        neighbours.push(floorPlan[i][j - 1])
        neighbours.push(floorPlan[i][j + 1])
        if (floorPlan[i + 1]) {
          neighbours.push(floorPlan[i + 1][j])
          neighbours.push(floorPlan[i + 1][j + 1])
          neighbours.push(floorPlan[i + 1][j - 1])
        }
        if (floorPlan[i - 1]) {
          neighbours.push(floorPlan[i - 1][j])
          neighbours.push(floorPlan[i - 1][j + 1])
          neighbours.push(floorPlan[i - 1][j - 1])
        }
        const numberOfNeighbours = neighbours.filter(x => x === occupied).length

        if (floorPlan[i][j] === unOccupied && numberOfNeighbours === 0) {
          copyPlan[i][j] = occupied
        } else if (floorPlan[i][j] === occupied && numberOfNeighbours >= 4) {
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
