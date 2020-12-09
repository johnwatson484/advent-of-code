const path = require('path')
const readFile = require('../../utils/read-file')

const findFirst = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => Number(x)).reverse()
  const first = findFirstInArray(values)
  console.log(first)
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

(async function () {
  await findFirst()
}())
