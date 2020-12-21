const path = require('path')
const readFile = require('../../utils/read-file')

const getTicketValidRate = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n')
  const rules = getRules(values)
  const errorRate = getErrorRate(values, rules)
  console.log(errorRate)
}

const getRules = (values) => {
  const rules = []
  let i = 0
  while (values[i] !== '') {
    const rule = parseRule(values[i])
    rules.push(rule)
    i++
  }
  return rules.flat()
}

const parseRule = (rule) => {
  const ruleValues = rule.replace(/ or/g, '').split(':')[1].trim().split(' ').map(createRuleArray).flat()
  return ruleValues
}

const createRuleArray = (rule) => {
  const ruleArray = []
  const rulePairs = rule.split('-')
  for (let i = Number(rulePairs[0]); i <= rulePairs[1]; i++) {
    ruleArray.push(i)
  }
  return ruleArray
}

const getErrorRate = (values, rules) => {
  let errorRate = 0
  const nearbyTicketsIndex = values.indexOf('nearby tickets:')
  for (let i = nearbyTicketsIndex + 1; i < values.length; i++) {
    const ticketErrorRate = values[i].split(',').map(Number).filter(x => !rules.includes(x)).reduce((x, y) => x + y, 0)
    errorRate += ticketErrorRate
  }
  return errorRate
}

(async function () {
  await getTicketValidRate()
}())
