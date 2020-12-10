const path = require('path')
const readFile = require('../../utils/read-file')

const getJoltDifference = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const adapters = data.toString().trim().split('\n').map(x => Number(x)).sort((x, y) => x - y)
  const difference = calculateDifference(adapters)
  console.log(difference)
}

const calculateDifference = (adapters) => {
  let previousAdapter = 0
  let ones = 0
  let threes = 1
  for (let i = 0; i < adapters.length; i++) {
    const difference = adapters[i] - previousAdapter
    if (difference === 1) {
      ones += 1
    } else if (difference === 3) {
      threes += 1
    }
    previousAdapter = adapters[i]
  }
  return ones * threes
}

(async function () {
  await getJoltDifference()
}())
