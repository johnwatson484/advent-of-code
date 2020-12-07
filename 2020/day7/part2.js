const path = require('path')
const readFile = require('../../utils/read-file')

const countValidBags = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const bagTree = data.toString().trim().replace(/ bags/g, '').replace(/ bag/g, '').replace(/[^?!.]*no other/g, '').replace(/\./g, '').split('\n').map(createBagTree)
  const validBags = getAllBagsFor('shiny gold', bagTree).map(x => x.amount).reduce((x, y) => x + y)
  console.log(validBags)
}

const createBagTree = (rule) => {
  const ruleValues = rule.trim().split(' contain ')
  return {
    bag: ruleValues[0].trim(),
    requiredBags: ruleValues[1].trim().split(', ').map(x => x.trim().split(/ (.*)/))
  }
}

const getAllBagsFor = (bag, bagTree) => {
  const validBags = []
  bagTree.filter(x => x.bag === bag)
    .map(x => x.requiredBags.map(y => validBags.push({ amount: Number(y[0]), bag: y[1] })))
  validBags.forEach(x => {
    for (let i = 0; i < x.amount; i++) {
      getAllBagsFor(x.bag, bagTree).map(y => validBags.push(y))
    }
  })
  return validBags
}

(async function () {
  await countValidBags()
}())
