const path = require('path')
const readFile = require('../../utils/read-file')

const getPermutations = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const adapters = data.toString().trim().split('\n').map(x => Number(x)).sort((x, y) => x - y)
  adapters.push(adapters[adapters.length - 1] + 3)
  adapters.unshift(0)
  const permutations = calculatePermutations(adapters)
  console.log(permutations)
}

const calculatePermutations = (adapters, memo = {}) => {
  const combo = adapters.join(',')
  if (combo in memo) {
    return memo[combo]
  }

  let result = 1
  for (let i = 1; i < adapters.length - 1; i++) {
    if (adapters[i + 1] - adapters[i - 1] <= 3) {
      const arr2 = [adapters[i - 1]].concat(adapters.slice(i + 1))
      result += calculatePermutations(arr2, memo)
    }
  }
  memo[combo] = result
  return result
}

(async function () {
  await getPermutations()
}())
