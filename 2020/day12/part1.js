const path = require('path')
const readFile = require('../../utils/read-file')

const getManhattanDistance = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const instructions = data.toString().trim().split('\n')
  const distance = calculate(instructions)
  console.log(distance)
}

const directionMap = {
  0: 'E',
  1: 'N',
  2: 'W',
  3: 'S'
}

const calculate = (instructions) => {
  let x = 0
  let y = 0
  let direction = 0
  const move = (direction, distance) => {
    switch (direction) {
      case 'N':
        x += distance
        break
      case 'S':
        x -= distance
        break
      case 'E':
        y += distance
        break
      case 'W':
        y -= distance
        break
    }
  }
  instructions.forEach(instruction => {
    const command = instruction[0]
    const distance = Number(instruction.substring(1))
    switch (command) {
      case 'L':
        direction = ((direction + (distance / 90)) + 4) % 4
        break
      case 'R':
        direction = ((direction - (distance / 90)) + 4) % 4
        break
      case 'F':
        move(directionMap[direction], distance)
        break
      default:
        move(command, distance)
        break
    }
  })
  return Math.abs(x) + Math.abs(y)
}

(async function () {
  await getManhattanDistance()
}())
