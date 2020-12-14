const path = require('path')
const readFile = require('../../utils/read-file')

const maskPrefix = 'mask = '
const allocationPrefix = 'mem'

const decode = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n')
  const memory = saveToMemory(values)
  const result = memory.reduce((x, y) => x + y.value, 0)
  console.log(result)
}

const saveToMemory = (values) => {
  const memory = []
  let mask
  for (let i = 0; i < values.length; i++) {
    if (values[i].startsWith(maskPrefix)) {
      mask = parseMask(values[i])
    } else if (values[i].startsWith(allocationPrefix)) {
      const allocation = parseAllocation(values[i])
      const valueBinary = convertValueToBinaryArray(allocation[1])
      mask.forEach(change => {
        valueBinary[change.position] = change.value
      })
      const updatedValue = convertBinaryArrayToValue(valueBinary)
      const index = memory.findIndex(x => x.location === allocation[0])
      if (index !== -1) {
        memory[index].value = updatedValue
      } else {
        memory.push({ location: allocation[0], value: updatedValue })
      }
    }
  }
  return memory
}

function parseMask (value) {
  return value.substring(maskPrefix.length).split('').map((x, i) => { return { value: x, position: i } }).filter(x => x.value !== 'X')
}

function parseAllocation (value) {
  return value.replace('mem[', '').replace('] =', '').split(' ')
}

function convertValueToBinaryArray (value) {
  return Number(value).toString(2).padStart(36, '0').split('')
}

function convertBinaryArrayToValue (array) {
  return parseInt(array.join(''), 2)
}

(async function () {
  await decode()
}())
