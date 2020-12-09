const path = require('path')
const readFile = require('../../utils/read-file')

const findFirst = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => parseInt(x)).reverse()
  const first = findFirstInArray(values)
  const sequence = getSequence(first, values.reverse())
  const code = Math.max.apply(Math, sequence) + Math.min.apply(Math, sequence)
  console.log(code)
}

const findFirstInArray = (values) => {
  let first
  let i = 0
  while (!first) {
    const valuesToCheck = values.slice(i + 1, i + 26)
    let hasSum = false
    for (let j = 0; j < valuesToCheck.length; j++) {
      for (let k = 0; k < valuesToCheck.length; k++) {
        if (valuesToCheck[j] !== valuesToCheck[k]) {
          if (valuesToCheck[j] + valuesToCheck[k] === values[i]) {
            hasSum = true
          }
        }
      }
    }
    if (!hasSum) {
      first = values[i]
    }
    i++
  }
  return first
}

const getSequence = (first, values) => {
  for (let i = 0; i < values.length; i++) {
    let sum = values[i]
    let j = i + 1
    while (sum <= first && j < values.length) {
      sum += values[j]
      if (sum === first) {
        return values.slice(i, j)
      }
      j++
    }
  }
}

(async function () {
  await findFirst()
}())
