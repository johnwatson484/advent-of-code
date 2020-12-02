(async function () {
  const fs = require('fs')
  const path = require('path')
  const util = require('util')
  const readFile = util.promisify(fs.readFile)
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => Number(x))

  const matchedValues = values.filter(x => hasMatch(x, values))
  const result = matchedValues.reduce((x, y) => x * y)
  console.log(result)
}())

function hasMatch (value, values) {
  const matchValue = 2020 - value
  return values.includes(matchValue)
}
