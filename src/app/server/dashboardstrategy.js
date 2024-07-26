import { dbQuizAuditoryIdx, dbQuizIdIdx, dbQuizTimeStartSIdx, dbQuizTypeIdx, dbSelectedAnswersIdIdx } from './dbMapping'
import { ratingMax } from './const'
import {
  getSelectedAnswersBy,
  getCurrentQuiz,
  getQuizOrderByIdDesc,
  getQuestGroupTypeBy,
  getSelectedOptions,
  getQuestGroupGroupBy
} from './actions'

import { metricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'

export const getCurrentQuizAuditory = async () => {
  let currentQuizIdAudi = await getCurrentQuizIdAudi()

  console.log('currentQuizPassAll ' + currentQuizIdAudi)

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

export const getCurrentQuizEngageCohort = async (cohortsLevelsPercents, totalRevenueStats) => {
  if (cohortsLevelsPercents.length != 2) {
    console.error('cohortsLevelsPercents.length is NOT 2 code base using two level system in cohort calculation')
  }

  if (totalRevenueStats.length != 5) {
    console.error('totalRevenueStats.length is ' + totalRevenueStats.length + ' must be 5 skip hg low not  ')
  }

  let quiz = await getQuizOrderByIdDesc(1, 0)

  var quizSplittedStr = quiz.toString().split(',')
  var quizTypeIdx = await dbQuizTypeIdx()
  var quizGroupId = quizSplittedStr[quizTypeIdx]

  let quizGroupType = await getQuestGroupTypeBy(quizGroupId)

  console.log('quizGroupType' + quizGroupType)
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

  if (countParticipators <= 0) {
    totalRevenueStats[3] = 0
    totalRevenueStats[2] = 0
    totalRevenueStats[1] = 0

    return totalRevenueStats
  }

  const CountCohort = async selectedAnswer => {
    var selectedAnswerSplittedStr = selectedAnswer.toString().split(',')

    var selectedAnswersIdx = await dbSelectedAnswersIdIdx()
    var selectedAnswerId = selectedAnswerSplittedStr[selectedAnswersIdx]

    var selectedOptions = await getSelectedOptions(selectedAnswerId)

    var selectedOptionsSplittedStr = selectedOptions.toString().split(',')

    var selectedAnswersSummOptions = selectedOptionsSplittedStr
      .map(str => Number.parseInt(str))
      .reduce((accumulator, currentValue) => {
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
  }

  for (var i = 0; i < selectedAnswers.length; i++) {
    var selectedAnswer = selectedAnswers[i]

    await CountCohort(selectedAnswer)
  }

  totalRevenueStats[1] = (quizSelectedAnswersInCohortHigh / countParticipators) * 100 //high
  totalRevenueStats[2] = (quizSelectedAnswersInCohortLow / countParticipators) * 100 //low
  totalRevenueStats[3] = (quizSelectedAnswersInCohortNot / countParticipators) * 100 //not

  return totalRevenueStats
}

export const getCurrentQuizMetricStats = async metricsStats => {
  if (metricsStats.length != metricsru.length - 1) {
    console.error('metricsStats length must be metrics length which is ' + (metricsru.length - 1))
  }

  let quiz = await getQuizOrderByIdDesc(1, 0)

  var quizSplittedStr = quiz.toString().split(',')
  var quizTypeIdx = await dbQuizTypeIdx()
  var quizGroupId = quizSplittedStr[quizTypeIdx]

  let quizGroupType = await getQuestGroupTypeBy(quizGroupId) //   'month-20q-1m'
  var quizTypeQuest = quizGroupType.toString().split('-') //'month' '20q' '1m'
  var quizTypeQuestNumSepar = quizTypeQuest[1].toString() // '20q'
  var quizTypeQuestNumStr = quizTypeQuestNumSepar.substring(0, quizTypeQuestNumSepar.length - 1) //'20'
  var quizCountQuestions = Number.parseInt(quizTypeQuestNumStr) //a 20

  var quizIdIdx = await dbQuizIdIdx()
  let quizId = quizSplittedStr[quizIdIdx]

  let quizGroupGroup = await getQuestGroupGroupBy(quizGroupId) //'1,2,3,4,5,6,32'..
  var questionsIdsStrsArr = quizGroupGroup.toString().split(',') //['1','2','3'..]
  var questionsIdsArr = questionsIdsStrsArr.map(qIdStr => Number.parseInt(qIdStr)) //[1,2,3..]
  //var questionsIdsMetricsArr = questionsIdsArr.map(qId => {})  //[1,2,3..]

  var questionsIdsMetricsArr = await Promise.all(
    questionsIdsArr.map(async qId => {
      //['Relationship with Peers','Wellness',..]
      await callAsynchronousOperation(qId)

      return item + 1
    })
  )

  return metricsStats
}
