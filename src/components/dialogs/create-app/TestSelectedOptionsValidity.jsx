export function checkValidArrNums(optionsArrayNums, countMax, countMin, maximum, minimum) {
  if (optionsArrayNums.length > countMax || optionsArrayNums.length < countMin) {
    return false
  }

  for (var i = 0; i < optionsArrayNums.length; i++) {
    if (optionsArrayNums[i] < minimum) {
      return false
    }

    if (optionsArrayNums[i] > maximum) {
      return false
    }
  }

  return true
}

export function checkValidJoinedStr(optionsArrayStr, countMax, countMin, maximum, minimum) {
  var splittedStr = optionsArrayStr.split(',')
  var numsArr = splittedStr.map(item => Number.parseInt(item))

  return checkValidArrNums(numsArr, countMax, countMin, maximum, minimum)
}
