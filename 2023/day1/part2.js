const fs = require('fs')
const path = require('path')
const data = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8').trim().split('\n')

let result = 0

const textNumbers = [{
  text: 'one', 
  number: '1'
}, {
  text: 'two', 
  number: '2'
}, {
  text: 'three',
  number: '3'
}, {
  text: 'four',
  number: '4'
}, {
  text: 'five',
  number: '5'
}, {
  text: 'six',
  number: '6'
}, {
  text: 'seven',
  number: '7'
}, {
  text: 'eight',
  number: '8'
}, {
  text: 'nine',
  number: '9'
}]

for (const line of data) {
  const lineValues = line.split('')
  const numbers = []

  for (let i = 0; i < lineValues.length; i++) {
    if (!isNaN(lineValues[i])) {
      numbers.push({ index: i, number: lineValues[i] })
    }
  }

  for (const textNumber of textNumbers) {
    const firstIndex = line.indexOf(textNumber.text)
    const lastIndex = line.lastIndexOf(textNumber.text)

    if (firstIndex !== -1 && numbers[0].index > firstIndex) {
      numbers.unshift({ index: firstIndex, number: textNumber.number })
    }

    if (lastIndex !== -1 && numbers[numbers.length - 1].index < lastIndex) {
      numbers.push({ index: lastIndex, number: textNumber.number })
    }
  }

  const total = numbers[0].number + numbers[numbers.length - 1].number
  result += Number(total)
}

console.log(result)
