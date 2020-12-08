const path = require('path')
const readFile = require('../../utils/read-file')

const boot = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const commands = data.toString().trim().replace(/\+/g, '').split('\n').map(x => x.split(' '))
  const accumulator = run(commands)
  console.log(accumulator)
}

const run = (commands) => {
  const stack = []
  let accumulator = 0
  let noDuplicates = true
  let i = 0
  do {
    if (stack.includes(commands[i])) {
      noDuplicates = false
    } else {
      stack.push(commands[i])
      switch (commands[i][0]) {
        case 'acc':
          accumulator += Number(commands[i][1])
          i += 1
          break
        case 'jmp':
          i += Number(commands[i][1])
          break
        default:
          i += 1
          break
      }
    }
  } while (noDuplicates)

  return accumulator
}

(async function () {
  await boot()
}())
