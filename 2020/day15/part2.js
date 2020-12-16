const path = require('path')
const readFile = require('../../utils/read-file')

const getValue = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split(',').map(Number)

  for (let i = values.length; i < 30000000; i++) {
    const value = values[i - 1]
    const occurences = values.filter(x => x === value).length
    if (occurences === 1) {
      values.push(0)
    } else {
      const previous = values.slice(0, values.length - 1)
      values.push(i - previous.lastIndexOf(value) - 1)
    }
  }
  console.log(values[values.length - 1])
}

(async function () {
  await getValue()
}())
