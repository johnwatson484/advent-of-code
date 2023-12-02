const fs = require('fs')
const path = require('path')
const data = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').trim().split('\n')

let result = 0

for (const line of data) {
  const lineValues = line.split('')
  const numbers = []

  for (const char of lineValues) {
    if (!isNaN(char)) {
      numbers.push(char)
    }
  }

  const total = numbers[0] + numbers[numbers.length - 1]
  result += Number(total)
}

console.log(result)
