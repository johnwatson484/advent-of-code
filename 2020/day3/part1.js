(async function () {
  const path = require('path')
  const readFile = require('../../utils/read-file')
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const values = data.toString().trim().split('\n').map(x => x.trim().split(''))
  const treesHit = sled(values)
  console.log(treesHit)
}())

const tree = '#'

const sled = (course) => {
  let treesHit = 0
  const courseDistance = course.length - 1
  const courseWidth = course[0].length - 1
  let currentDistance = 0
  let currentWidth = 0

  while (currentDistance < courseDistance) {
    currentDistance += 1
    currentWidth += 3
    if (currentWidth > courseWidth) {
      currentWidth = currentWidth - courseWidth - 1
    }
    const hit = course[currentDistance][currentWidth]
    treesHit += (hit === tree ? 1 : 0)
  }

  return treesHit
}
