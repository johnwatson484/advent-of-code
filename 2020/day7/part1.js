const path = require('path')
const readFile = require('../../utils/read-file')

const countValidBags = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const bagTree = data.toString().trim().replace(/ bags/g, '').replace(/ bag/g, '').replace(/\./g, '').replace(/[0-9] /g, '').split('\n').map(createBagTree)
  const validBags = [...new Set(getAllValidBagsFor('shiny gold', bagTree))].length
  console.log(validBags)
}

const createBagTree = (rule) => {
  const ruleValues = rule.trim().split(' contain ')
  return {
    bag: ruleValues[0].trim(),
    allowedBags: ruleValues[1].trim().split(', ')
  }
}

const getAllValidBagsFor = (bag, bagTree) => {
  const validBags = []
  bagTree.filter(x => x.allowedBags.includes(bag))
    .map(x => validBags.push(x.bag))
  validBags.map(x => getAllValidBagsFor(x, bagTree).map(y => validBags.push(y)))
  return validBags
}

(async function () {
  await countValidBags()
}())
