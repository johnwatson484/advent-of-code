(async function () {
  const path = require('path')
  const readFile = require('../../utils/read-file')
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => x.trim().replace(':', '').replace('-', ' ').split(' '))

  const validPasswords = values.filter(x => (checkLocation(x[0], x[2], x[3]) !== checkLocation(x[1], x[2], x[3])))
  console.log(validPasswords.length)
}())

const checkLocation = (location, character, password) => {
  return password[location - 1] === character
}
