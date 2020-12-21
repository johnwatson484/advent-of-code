const path = require('path')
const readFile = require('../../utils/read-file')

const getTicketValidRate = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n')
  const rules = getRules(values)
  console.log(result)
}

const getRules = (values) => {
  const
  return values.includes(matchValue)
}

(async function () {
  await getTicketValidRate()
}())
