import { ratingMax } from './../../../app/server/const.jsx'

const handleChange = (selectedOptions, activeStep, answersCount, answerId) => {
  console.log(' selectedOptionslength' + selectedOptions.length)

  if (answersCount <= 1) {
    throw 'Exception answersCount Quiz answers count each question' + answersCount + ' must be more than 1 '
  }

  if (typeof answerId === 'number') {
    //console.log(' prop int ' + answerId)
    var grade = answerId * (ratingMax / (answersCount - 1))

    selectedOptions[activeStep] = grade

    //console.log(' prop number  ' + answerId + 'grade ten scale normalized is ' + grade)
  } else {
    throw 'type error ' + typeof answerId + ' is not supported! supported type  - int!  : VerticalRadioSVG '
  }
}

export const handleChangeFollowUps = (followUps, activeStep, answer) => {
  console.log(' followUps' + followUps + ' activeStep ' + activeStep + ' answer ' + answer)

  followUps[activeStep] = answer

  console.log(' followUps.length' + followUps.length)
}

export default handleChange
