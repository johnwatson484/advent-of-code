const path = require('path')
const readFile = require('../../utils/read-file')

const getBus = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n')
  const arrivalTime = Number(values[0])
  const buses = values[1].split(',').filter(x => x !== 'x').map(Number)
  const timetable = createTimeTable(arrivalTime, buses)
  const selectedBus = timetable.filter(x => x.departureTime >= arrivalTime)[0]
  const waitingTime = selectedBus.departureTime - arrivalTime
  console.log(waitingTime * selectedBus.bus)
}

const createTimeTable = (arrivalTime, buses) => {
  const longestDuration = Math.max.apply(Math, buses)
  const latestDeparture = longestDuration + arrivalTime
  const timetable = []
  buses.forEach(bus => {
    let departureTime = 0
    while (departureTime <= latestDeparture) {
      departureTime += bus
      timetable.push({ bus, departureTime })
    }
  })
  return timetable.sort((a, b) => a.departureTime - b.departureTime)
}

(async function () {
  await getBus()
}())
