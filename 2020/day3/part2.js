const path = require('path')
const readFile = require('../../utils/read-file')
const tree = '#'

const trackTrees = async () => {
  const data = await readFile(path.resolve(__dirname, 'data.txt'))
  const course = data.toString().trim().split('\n').map(x => x.trim().split(''))
  const routes = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1]
  ]
  const treesHit = routes.map(x => sled(course, x[0], x[1]))
  const result = treesHit.reduce((x, y) => x * y)
  console.log(result)
}

const sled = (course, down, right) => {
  let treesHit = 0
  const courseDistance = course.length - 1
  const courseWidth = course[0].length - 1
  let currentDistance = 0
  let currentWidth = 0

  while (currentDistance < courseDistance) {
    currentDistance += down
    currentWidth += right
    if (currentWidth > courseWidth) {
      currentWidth = currentWidth - courseWidth - 1
    }
    const hit = course[currentDistance][currentWidth]
    treesHit += (hit === tree ? 1 : 0)
  }

  return treesHit
}

(async function () {
  await trackTrees()  
}())
