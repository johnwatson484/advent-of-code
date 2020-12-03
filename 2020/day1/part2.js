const path = require('path')
const readFile = require('../../utils/read-file')

const confirmAccounts = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => Number(x))
  const matchedValues = values.filter(x => values.some(y => hasMatch((2020 - x), y, values)))
  const result = matchedValues.reduce((x, y) => x * y)
  console.log(result)
}

const hasMatch = (target, value, values) => {
  const matchValue = target - value
  return values.includes(matchValue)
}

(async function () {
  await confirmAccounts()
}())
