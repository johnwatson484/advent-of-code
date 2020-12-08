const path = require('path')
const readFile = require('../../utils/read-file')

const boot = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const commands = data.toString().trim().replace(/\+/g, '').split('\n').map(x => x.split(' '))
  const accumulator = modifySequence(commands)
  console.log(accumulator)
}

const modifySequence = (commands) => {
  let accumulator
  let i = 0
  while (!accumulator) {
    try {
      const modifiedCommands = JSON.parse(JSON.stringify(commands))
      switch (modifiedCommands[i][0]) {
        case 'nop':
          modifiedCommands[i][0] = 'jmp'
          break
        case 'jmp':
          modifiedCommands[i][0] = 'nop'
          break
        default:
          break
      }
      accumulator = run(modifiedCommands)
    } catch {}
    i++
  }
  return accumulator
}

const run = (commands) => {
  const stack = []
  let accumulator = 0
  const terminationCommand = commands.length
  let i = 0
  while (i !== terminationCommand) {
    if (stack.includes(commands[i])) {
      throw new Error('Infinite loop')
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
  }
  return accumulator
}

(async function () {
  await boot()
}())
