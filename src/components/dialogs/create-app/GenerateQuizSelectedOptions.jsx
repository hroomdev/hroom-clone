//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

import NonsensePhrases from '@/components/layout/vertical/NonsensePhrases'

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

export const generateFollowUps = followUpsCount => {
  let generatedFollowUps = [4, 5, 5, 5, 5, 5, 3, 3, 3, 1, 2] //test data

  for (var i = 0; i < followUpsCount; i++) {
    generatedFollowUps[i] = NonsensePhrases.phrases[getRandomInt(NonsensePhrases.phrases.length - 1)]
    console.log('сгенерирована нонсенс фраза сохранена ' + generatedFollowUps[i])
  }

  return generatedFollowUps
}

export default generateOptions
