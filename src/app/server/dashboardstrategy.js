import ruLocale from 'date-fns/locale/ru'

import { formatDistanceToNow, intervalToDuration } from 'date-fns'

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

// Data Imports

export var companyId = 1

import { metricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'

const local = 'ru-RU'

export const getDashboardData = async () => {
  var participantsQuizPassed
  var participantsQuizAll
  var participationPercent

  var currentQuizStarts = new Date(Date.UTC(2024, 6, 17, 3, 10, 0)) //23 мая 2024
  var curToNow = 'неделю'
  var nowToNext = '13 дней'
  var nextQuizStarts = new Date(Date.UTC(2024, 7, 5, 7, 12, 6)) // 3 июня 2024
  var totalRevenueStats = [
    1.5, // процент изменения с последнего опроса
    21, // статистика тотал по всем метрикам  вовлеченные
    26, // статистика тотал по всем метрикам  слабо
    23, // статистика тотал по всем метрикам  невовлеченные
    30 // статистика тотал по всем метрикам  пропустили
  ]

  var transactionsMetricStats = [1.1, 2.2, 3.3, 7.7, 7.8, 7.9, 8.0, 3.3, 5.0, 8.8]

  var transactionsMetricDiffStats = [1.1, 0.5, 1.2, 1.1, 1.8, 0.9, 0.3, 0.8, 1.2, 0.8]

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  // Vars
  var seriesApexLineMetrics = [
    {
      data: [5.5, 1.0, 4.5]
    },
    {
      data: [4.5, 2.0, 4.5]
    },
    {
      data: [3.5, 3.0, 4.5]
    },
    {
      data: [2.5, 4.0, 4.5]
    },
    {
      data: [1.5, 5.0, 4.5]
    },
    {
      data: [0.5, 6.0, 4.5]
    },
    {
      data: [9.5, 7.0, 4.5]
    },
    {
      data: [8.5, 8.0, 4.5]
    },
    {
      data: [7.5, 9.0, 4.5]
    },
    {
      data: [6.5, 10.0, 4.5]
    }
  ]

  var categoriesApexLineMetrics = ['7/12', '8/12', '9/12']

  var timeStart = Date.now()

  await getCurrentQuizAuditory().then(data => {
    participantsQuizPassed = data[0]

    participantsQuizAll = data[1]

    participationPercent = Math.round((participantsQuizPassed / participantsQuizAll) * 100)

    totalRevenueStats[4] = 100 - participationPercent
  })

  await getCurrentQuizTimeStart().then(data => {
    currentQuizStarts = new Date(data)
    curToNow = formatDistanceToNow(currentQuizStarts, { locale: ruLocale })
    nowToNext = formatDistanceToNow(nextQuizStarts, { locale: ruLocale })
  })

  var cohortsLevelsPercents = [33, 66]

  for (var i = 0; i < totalRevenueStats.length; i++) {
    totalRevenueStats[i] = 0
  }

  for (var i = 0; i < transactionsMetricStats.length; i++) {
    transactionsMetricStats[i] = 0
    transactionsMetricDiffStats[i] = 0
  }

  let quizes = await getQuizOrderByIdDesc(2, 0)

  var diffStats = transactionsMetricDiffStats

  for (var i = quizes.length - 1; i > -1; i--) {
    var quiz = quizes[i]

    var result = await getEngageMetrics(quiz, cohortsLevelsPercents, totalRevenueStats, transactionsMetricStats)

    var revStats = result[0]
    var metStats = result[1]

    diffStats = diffStats.map(function (item, index) {
      var res = metStats[index] - item

      return res
    })

    if (i == 0) {
      totalRevenueStats = revStats
      transactionsMetricStats = metStats
      transactionsMetricDiffStats = diffStats
      break
    }
  }

  var timeEnd = Date.now()

  console.log(
    'interval ' +
      intervalToDuration({
        start: timeStart,
        end: timeEnd
      })
  )

  var dbase = []

  var db = {}

  db.id = companyId

  db.participationPercent = participationPercent
  db.participantsQuizPassed = participantsQuizPassed
  db.participantsQuizAll = participantsQuizAll

  db.currentQuizStarts = currentQuizStarts.toLocaleDateString(local, options)
  db.curToNow = curToNow
  db.nowToNext = nowToNext
  db.nextQuizStarts = nextQuizStarts.toLocaleDateString(local, options)
  db.totalRevenueStats = totalRevenueStats //[]
  db.transactionsMetricStats = transactionsMetricStats //[]
  db.transactionsMetricDiffStats = transactionsMetricDiffStats //[]
  db.seriesApexLineMetrics = seriesApexLineMetrics //[]
  db.categoriesApexLineMetrics = categoriesApexLineMetrics //[]

  dbase.push(db)

  return dbase
}

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

export const getEngageMetrics = async (quiz, cohortsLevelsPercents, totalRevenueStats, metricsStats) => {
  var revStats = totalRevenueStats
  var metStats = metricsStats

  const midRangeRate = ratingMax / 2
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

  var quizCountParticipators = selectedAnswers.length //c

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

  var counterMetricQuiz = [metStats.length]

  for (var i = 0; i < metStats.length; i++) {
    var counterMetric = questionsMetricsArr.reduce((accumulator, currentValue) => {
      if (Object.keys(metricsru).at(i) == currentValue) {
        return accumulator + 1
      }

      return accumulator
    }, 0)

    counterMetricQuiz[i] = counterMetric
  }

  //transaction stats metrics END///////////////////////////

  if (quizCountParticipators <= 0) {
    revStats[3] = 0
    revStats[2] = 0
    revStats[1] = 0

    return [revStats, metStats]
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

  //metricsStats.map(item => console.log('selAnsLen ' + selAnsLen + ' item ' + item))

  for (var i = 0; i < metricsStats.length; i++) {
    if (metricsStats[i] != 0) {
      metricsStats[i] = metricsStats[i] / selAnsLen
    } else console.log('metricsStats [i] ' + i + ' is zero ')
  }

  totalRevenueStats[1] = (quizSelectedAnswersInCohortHigh / quizCountParticipators) * 100 //high
  totalRevenueStats[2] = (quizSelectedAnswersInCohortLow / quizCountParticipators) * 100 //low
  totalRevenueStats[3] = (quizSelectedAnswersInCohortNot / quizCountParticipators) * 100 //not

  return [totalRevenueStats, metricsStats]
}
