const path = require('path')
const readFile = require('../../utils/read-file')

const countGroups = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const groupAnswers = data.toString().trim().split('\n\n').filter(x => x !== '')
    .map(x => [...new Set(x.replace(/\n/g, '').split(''))])
    .map(x => x.length)
    .reduce((x, y) => x + y)
  console.log(groupAnswers)
}

(async function () {
  await countGroups()
}())
