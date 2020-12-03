const fs = require('fs')
const util = require('util')

module.exports = async (filePath) => {
  const readFile = util.promisify(fs.readFile)
  return readFile(filePath)
}
