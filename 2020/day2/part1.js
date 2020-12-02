(async function () {
  const fs = require('fs')
  const path = require('path')
  const util = require('util')
  const readFile = util.promisify(fs.readFile)
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => x.trim().replace(':', '').replace('-', ' ').split(' '))

  const validPasswords = values.filter(x => isValid(x[0], x[1], x[2], x[3]))
  console.log(validPasswords.length)
}())

const isValid = (min, max, character, password) => {
  const occurences = (password.match(new RegExp(character, 'g')) || []).length
  return occurences >= min && occurences <= max
}
