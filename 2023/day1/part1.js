const fs = require('fs')
const path = require('path')
const data = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').trim().split('\n')

let result = 0

for (const line of data) {
  const lineValues = line.split('')
  let firstNumber
  let lastNumber
  for (let i = 0; i < lineValues.length; i++) {
    if(!isNaN(lineValues[i])) {
      firstNumber = lineValues[i]
      break
    }
  }
  for (let i = lineValues.length; i >= 0; i--) {
    if(!isNaN(lineValues[i])) {
      lastNumber = lineValues[i]
      break
    }
  }
  const total = firstNumber + lastNumber
  result += Number(total)
}

console.log(result)
