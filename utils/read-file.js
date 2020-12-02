const fs = require('fs')
const path = require('path')
const util = require('util')

module.exports = async (filePath) => {
  const readFile = util.promisify(fs.readFile)
  return readFile(path.resolve(__dirname, filePath))
}
