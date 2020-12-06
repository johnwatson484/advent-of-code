const path = require('path')
const readFile = require('../../utils/read-file')

const countGroups = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const groupAnswers = data.toString().trim().split('\n\n').filter(x => x !== '')
    .map(x => x.split('\n').map(x => x.split('')))
    .map(x => getMatchedValues(x))
    .reduce((x, y) => x + y)
  console.log(groupAnswers)
}

const getMatchedValues = (group) => {
  const groupMembers = group.length
  const combined = []
  group.map(x => x.map(y => combined.push(y)))
  return [...new Set(combined.filter(x => combined.filter(y => y === x).length === groupMembers))].length
}

(async function () {
  await countGroups()
}())
