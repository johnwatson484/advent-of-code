const path = require('path')
const readFile = require('../../utils/read-file')

const rows = [...Array(128).keys()]
const seats = [...Array(8).keys()]

const getHighestSeatId = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n')
  const seatIds = values.map(x => getSeatId(x))
  console.log(Math.max(...seatIds))
}

const getSeatId = (pass) => {
  const values = pass.split('')
  let row = values[0] === 'F' ? rows.slice(0, 64) : rows.slice(64)
  row = values[1] === 'F' ? row.slice(0, 32) : row.slice(32)
  row = values[2] === 'F' ? row.slice(0, 16) : row.slice(16)
  row = values[3] === 'F' ? row.slice(0, 8) : row.slice(8)
  row = values[4] === 'F' ? row.slice(0, 4) : row.slice(4)
  row = values[5] === 'F' ? row.slice(0, 2) : row.slice(2)
  row = (values[6] === 'F' ? row.slice(0, 1) : row.slice(1))[0]

  let seat = values[7] === 'L' ? seats.slice(0, 4) : seats.slice(4)
  seat = values[8] === 'L' ? seat.slice(0, 2) : seat.slice(2)
  seat = (values[9] === 'L' ? seat.slice(0, 1) : seat.slice(1))[0]

  return row * 8 + seat
}

(async function () {
  await getHighestSeatId()
}())
