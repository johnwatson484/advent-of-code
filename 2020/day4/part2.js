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
  if (matches.length === identifiers.length) {
    return validateData(passport)
  }
  return false
}

const validateData = (passport) => {
  return validBirthYear(passport) &&
    validIssueYear(passport) &&
    validExpirationYear(passport) &&
    validHeight(passport) &&
    validHairColour(passport) &&
    validEyeColour(passport) &&
    validPassportId(passport)
}

const validBirthYear = (passport) => {
  const value = getValue(passport, 'byr')
  return value >= 1920 && value <= 2002
}

const validIssueYear = (passport) => {
  const value = getValue(passport, 'iyr')
  return value >= 2010 && value <= 2020
}

const validExpirationYear = (passport) => {
  const value = getValue(passport, 'eyr')
  return value >= 2020 && value <= 2030
}

const validHeight = (passport) => {
  let value = getValue(passport, 'hgt')
  if (value.includes('cm')) {
    value = value.replace('cm', '')
    return value >= 150 && value <= 193
  }
  if (value.includes('in')) {
    value = value.replace('in', '')
    return value >= 59 && value <= 76
  }
  return false
}

const validHairColour = (passport) => {
  const value = getValue(passport, 'hcl')
  const regex = /^#([0-9a-fA-F]{6})$/
  return regex.test(value)
}

const validEyeColour = (passport) => {
  const value = getValue(passport, 'ecl')
  const valid = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  return valid.includes(value)
}

const validPassportId = (passport) => {
  const value = getValue(passport, 'pid')
  const regex = /^([0-9]{9})$/
  return regex.test(value)
}

const getValue = (passport, identifier) => {
  const index = passport.indexOf(`${identifier}:`)
  const value = passport.substring(index + identifier.length + 1).split(' ')[0].split('\n')[0]
  return value
}

(async function () {
  await countValidPassports()
}())
