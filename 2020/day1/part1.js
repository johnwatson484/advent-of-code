(async function () {
  const fs = require('fs')
  const util = require('util')
  const readFile = util.promisify(fs.readFile)
  const data = await readFile(__dirname + '/data.txt')
  const values = data.toString().trim().split("\n")

  const matchedValues = values.filter(x => hasMatch(x, values))
  const result = matchedValues.reduce((x, y) => x * y)
  console.log(result)
}())

function hasMatch(value, values) {
  const matchValue = 2020 - Number(value)
  return values.includes(matchValue.toString())
}
