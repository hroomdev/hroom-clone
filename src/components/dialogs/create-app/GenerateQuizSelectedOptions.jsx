//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

export function getRandomInt(max) {
  return Math.ceil(Math.random() * max)
}

const generateOptions = (questionsCount, maximum) => {
  let generatedOptions = [4, 5, 5, 5, 5, 5, 3, 3, 3, 1, 2] //test data

  for (var i = 0; i < questionsCount; i++) {
    generatedOptions[i] = getRandomInt(maximum)
  }

  return generatedOptions
}

export default generateOptions
