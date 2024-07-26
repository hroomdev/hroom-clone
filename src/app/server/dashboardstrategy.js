import { dbQuizAuditoryIdx, dbQuizIdIdx, dbQuizTimeStartSIdx, dbQuizTypeIdx, dbSelectedAnswersIdIdx } from './dbMapping'
import { ratingMax } from './const'
import {
  getSelectedAnswersBy,
  getCurrentQuiz,
  getQuizOrderByIdDesc,
  getQuestGroupTypeBy,
  getSelectedOptions,
  getQuestGroupGroupBy,
  getQuestionMetricBy
} from './actions'

import { metricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'

export const getCurrentQuizAuditory = async () => {
  let currentQuizIdAudi = await getCurrentQuizIdAudi()

  let currentQuizId = currentQuizIdAudi[0]
  let currentQuizAudi = currentQuizIdAudi[1]

  var selectedAnswers = await getSelectedAnswersBy(currentQuizId)

  return [selectedAnswers.length, currentQuizAudi]
}

export const getCurrentQuizTimeStart = async () => {
  let currentQuiz = await getCurrentQuiz()

  var splittedStr = currentQuiz.toString().split(',')
  var timeStartIdx = await dbQuizTimeStartSIdx()
  var currentQuizTimeStart = Date.parse(splittedStr[timeStartIdx])

  return currentQuizTimeStart
}

export const getCurrentQuizIdAudi = async () => {
  try {
    let currentQuiz = await getCurrentQuiz()

    var splittedStr = currentQuiz.toString().split(',')

    for (var i = 0; i < splittedStr.length; i++) {}

    var quizIdIdx = await dbQuizIdIdx()

    var currentQuizId = Number.parseInt(splittedStr[quizIdIdx])

    var auditoryIdx = await dbQuizAuditoryIdx()

    var currentQuizAuditory = Number.parseInt(splittedStr[auditoryIdx])
  } catch (e) {
    console.error(e.stack)
  } finally {
  }

  return [currentQuizId, currentQuizAuditory]
}

export const getCurrentQuizEngageMetrics = async (cohortsLevelsPercents, totalRevenueStats, metricsStats) => {
  const midRangeRate = ratingMax / 2

  let quiz = await getQuizOrderByIdDesc(1, 0)

  var quizSplittedStr = quiz.toString().split(',')
  var quizTypeIdx = await dbQuizTypeIdx()
  var quizGroupId = quizSplittedStr[quizTypeIdx]

  let quizGroupType = await getQuestGroupTypeBy(quizGroupId)

  var quizTypeQuest = quizGroupType.toString().split('-') //   month-20q-1m

  var quizTypeQuestNumSepar = quizTypeQuest[1].toString() //

  var quizTypeQuestNumStr = quizTypeQuestNumSepar.substring(0, quizTypeQuestNumSepar.length - 1)

  var quizCountQuestions = Number.parseInt(quizTypeQuestNumStr) //a

  var quizMaxRating = quizCountQuestions * ratingMax //b

  var quizIdIdx = await dbQuizIdIdx()
  let quizId = quizSplittedStr[quizIdIdx]

  var selectedAnswers = await getSelectedAnswersBy(quizId)

  var countParticipators = selectedAnswers.length //c

  var quizSelectedAnswersInCohortNot = 0 //dnot
  var quizSelectedAnswersInCohortLow = 0 //dlow
  var quizSelectedAnswersInCohortHigh = 0 //dhigh

  //transactions stats START/////////////////////////////////////
  let quizGroupGroup = await getQuestGroupGroupBy(quizGroupId) //'1,2,3,4,5,6,32'..
  var questionsIdsStrsArr = quizGroupGroup.toString().split(',') //['1','2','3'..]
  var questionsIdsArr = questionsIdsStrsArr.map(qIdStr => Number.parseInt(qIdStr)) //[1,2,3..]
  var questionsMetricsArr = await Promise.all(
    // eslint-disable-next-line lines-around-comment
    //['Relationship with Peers','Wellness',..]
    questionsIdsArr.map(async qId => {
      var qMetric = await getQuestionMetricBy(qId)

      return qMetric
    })
  )

  for (var i = 0; i < metricsStats.length; i++) {
    //reset test metricStats
    metricsStats[i] = 0
  }

  var counterMetricQuiz = [metricsStats.length]

  for (var i = 0; i < metricsStats.length; i++) {
    var counterMetric = questionsMetricsArr.reduce((accumulator, currentValue) => {
      if (Object.keys(metricsru).at(i) == currentValue) {
        return accumulator + 1
      }

      return accumulator
    }, 0)

    counterMetricQuiz[i] = counterMetric
  }

  //transaction stats metrics END///////////////////////////

  if (countParticipators <= 0) {
    totalRevenueStats[3] = 0
    totalRevenueStats[2] = 0
    totalRevenueStats[1] = 0

    return [totalRevenueStats, metricsStats]
  }

  const CountCohort = async selectedAnswer => {
    var selectedAnswerSplittedStr = selectedAnswer.toString().split(',')

    var selectedAnswersIdx = await dbSelectedAnswersIdIdx()
    var selectedAnswerId = selectedAnswerSplittedStr[selectedAnswersIdx]

    var selectedOptions = await getSelectedOptions(selectedAnswerId)

    var selectedOptionsSplittedStr = selectedOptions.toString().split(',')

    //checks for empty values too
    var selectedOptionsNumArr = selectedOptionsSplittedStr.map(str => Number.parseInt(str) || midRangeRate)

    //check for db consistency
    selectedOptionsNumArr = selectedOptionsNumArr.map(num => (num < 0 ? midRangeRate : num))

    var selectedAnswersSummOptions = selectedOptionsNumArr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

    var ratingQuizPercentInt = (selectedAnswersSummOptions / quizMaxRating) * 100 //f

    //33 66
    if (ratingQuizPercentInt <= cohortsLevelsPercents[0]) {
      quizSelectedAnswersInCohortNot = quizSelectedAnswersInCohortNot + 1
    } else if (ratingQuizPercentInt <= cohortsLevelsPercents[1]) {
      quizSelectedAnswersInCohortLow = quizSelectedAnswersInCohortLow + 1
    } else {
      quizSelectedAnswersInCohortHigh = quizSelectedAnswersInCohortHigh + 1
    }

    for (var i = 0; i < selectedOptionsNumArr.length; i++) {
      var metric = questionsMetricsArr[i].toString()
      var metricIdx = Object.keys(metricsru).findIndex(key => key == metric)

      if (counterMetricQuiz != 0) {
        metricsStats[metricIdx] = metricsStats[metricIdx] + selectedOptionsNumArr[i] / counterMetricQuiz[metricIdx] // //0+5.2+6.4+..
      } else
        console.error(
          'count of question in quiz id' +
            quizId +
            '  selectedAnswers id ' +
            selectedAnswerId +
            '  metric ' +
            metric +
            ' zero ERROR'
        )
    }
  }

  var selAnsLen = selectedAnswers.length

  for (var i = 0; i < selAnsLen; i++) {
    var selectedAnswer = selectedAnswers[i]

    await CountCohort(selectedAnswer)
  }

  metricsStats.map(item => console.log(item))

  for (var i = 0; i < metricsStats.length; i++) {
    if (metricsStats[i] != 0) {
      metricsStats[i] = metricsStats[i] / selAnsLen
    } else console.log('metricsStats [i] ' + i + ' is zero ')
  }

  totalRevenueStats[1] = (quizSelectedAnswersInCohortHigh / countParticipators) * 100 //high
  totalRevenueStats[2] = (quizSelectedAnswersInCohortLow / countParticipators) * 100 //low
  totalRevenueStats[3] = (quizSelectedAnswersInCohortNot / countParticipators) * 100 //not

  return [totalRevenueStats, metricsStats]
}
