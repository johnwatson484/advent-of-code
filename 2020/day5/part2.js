const path = require('path')
const readFile = require('../../utils/read-file')

const getHighestSeatId = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n')
  const seatIds = values.map(x => getSeatId(x)).filter(x => x !== -1).sort((x, y) => x - y)
  for (let i = 0; i < seatIds.length; i++) {
    if (seatIds[i] - seatIds[i - 1] !== 1 && seatIds[i] !== seatIds[0]) {
      console.log(seatIds[i] - 1)
    }
  }
}

const getSeatId = (pass) => {
  const values = pass.split('')
  const row = decodePassValue('F', 64, values.slice(0, 7), 128)
  const seat = decodePassValue('L', 4, values.slice(7), 8)

  const validSeat = row !== 0 && row !== 127
  return !validSeat ? -1 : row * 8 + seat
}

const decodePassValue = (lowerKey, divider, pass, totalItems) => {
  let items = [...Array(totalItems).keys()]
  for (let i = 0; i < pass.length; i++) {
    items = pass[i] === lowerKey ? items.slice(0, divider) : items.slice(divider)
    divider /= 2
  }
  return items[0]
}

(async function () {
  await getHighestSeatId()
}())
