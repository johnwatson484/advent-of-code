(async function () {
  const path = require('path')
  const readFile = require('../../utils/read-file')
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => Number(x))

  const matchedValues = values.filter(x => hasMatch(x, values))
  const result = matchedValues.reduce((x, y) => x * y)
  console.log(result)
}())

const hasMatch = (value, values) => {
  const matchValue = 2020 - value
  return values.includes(matchValue)
}
