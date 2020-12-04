const path = require('path')
const readFile = require('../../utils/read-file')

const identifiers = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
]

const countValidPassports = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const validPassports = data.toString().trim().split('\n\n').filter(x => x !== '').filter(x => isValid(x))
  console.log(validPassports.length)
}

const isValid = (passport) => {
  const matches = identifiers.filter(x => passport.includes(x))
  return matches.length === identifiers.length
}

(async function () {
  await countValidPassports()
}())
