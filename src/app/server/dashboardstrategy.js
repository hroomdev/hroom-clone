// MUI Imports
import React, { useCallback, cache } from 'react'

import Grid from '@mui/material/Grid'

import ruLocale from 'date-fns/locale/ru'

import { formatDistanceToNow, intervalToDuration } from 'date-fns'

import { DashboardBuilder } from '@views/dashboards/dashboard/src/screens/DashboardBuilder'

import DashboardWelcomeCard from '@views/dashboards/dashboard/src/DashboardWelcomeCard'

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

const intervalDataUpd = 1000

import { metricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'

const local = 'ru-RU'

export async function preload(id) {
  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  //https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-and-sequential-data-fetching
  await getDashboardData(id)
}

export async function Item(id) {
  const result = await getDashboardData(id)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DashboardWelcomeCard />
      </Grid>
      <Grid item>
        <DashboardBuilder dashboardData={result} />
      </Grid>
    </Grid>
  )
}

var resultAllIds = []

async function waitUntil(f) {
  return await new Promise(resolve => {
    const interval = setInterval(async () => {
      var result = await f()

      //console.log(' isavailabel ' + result)

      if (result) {
        resolve('foo')
        clearInterval(interval)
      }
    }, intervalDataUpd)
  })
}

export async function checkIsAvailable(id) {
  const isAvailable = async () => {
    return resultAllIds[id] != null && resultAllIds[id] != undefined && resultAllIds.length >= id - 1
  }

  await waitUntil(isAvailable)

  return true
}

export const getDashboardData = cache(async id => {
  //set cache renewal conditionscheck is available on each new user data must be set false
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
    30, // статистика тотал по всем метрикам  пропустили
    1.1 //абсолютное значение вовлеченности
  ]

  var transactionsMetricStats = [1.1, 2.2, 3.3, 7.7, 7.8, 7.9, 8.0, 3.3, 5.0, 8.8]

  var transactionsMetricDiffStats = [1.1, 0.5, 1.2, 1.1, 1.8, 0.9, 0.3, 0.8, 1.2, 0.8]

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const optionsChart = {
    day: 'numeric',
    hour: 'numeric'
  }

  // Vars
  var seriesApexLineMetrics = [
    {
      data: [] //5.5, 1.0, 4.5
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    }
  ]

  var categoriesApexLineMetrics = [] //'7/12', '8/12', '9/12'

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
    if (i != 4) totalRevenueStats[i] = 0
  }

  for (var i = 0; i < transactionsMetricStats.length; i++) {
    transactionsMetricStats[i] = 0
    transactionsMetricDiffStats[i] = 0
  }

  let quizes = await getQuizOrderByIdDesc(12, 0)

  var diffStats = transactionsMetricDiffStats

  for (var i = quizes.length - 1; i > -1; i--) {
    var quiz = quizes[i]

    var engageResult = await getEngageMetrics(quiz, cohortsLevelsPercents, totalRevenueStats, transactionsMetricStats)

    console.log('quiz ' + JSON.stringify(quiz) + 'len - 1 ' + (quizes.length - 1) + ' i ' + i)

    var revStats = engageResult[0]
    var metStats = engageResult[1]

    if (i == 1) {
      diffStats = diffStats.map(function (item, index) {
        var res = metStats[index]

        return res
      })

      //console.log('engage current ' + totalRevenueStats[5])
    }

    if (i == 0) {
      diffStats = diffStats.map(function (item, index) {
        var res = metStats[index] - item

        return res
      })
      var engageLast = diffStats.reduce((partialSum, a) => partialSum + a, 0) / 10

      totalRevenueStats[0] = (engageLast / 10) * 100
    }

    if (i == 0) {
      totalRevenueStats = revStats
      transactionsMetricStats = metStats
      transactionsMetricDiffStats = diffStats
      totalRevenueStats[5] = metStats.reduce((partialSum, a) => partialSum + a, 0) / 10
    }

    seriesApexLineMetrics = seriesApexLineMetrics.map((item, index) => {
      item.data.push(metStats[index].toFixed(2))

      return item
    })

    var quizSplittedStr = quiz.toString().split(',')
    var quizStartsAtDateIdx = await dbQuizTimeStartSIdx()
    var quizStartsAtDate = quizSplittedStr[quizStartsAtDateIdx]
    var dateParsed = Date.parse(quizStartsAtDate)
    var dateToLocal = new Date(dateParsed).toLocaleString(local, options)

    categoriesApexLineMetrics.push(dateToLocal)
    console.log('push ' + dateToLocal)
  }

  var timeEnd = Date.now()

  //console.log(
  //  'interval ' +
  //    intervalToDuration({
  //      start: timeStart,
  //      end: timeEnd
  //    })
  //)

  var db = {
    id: id,
    participationPercent: participationPercent,
    participantsQuizPassed: participantsQuizPassed,
    participantsQuizAll: participantsQuizAll,

    currentQuizStarts: currentQuizStarts.toLocaleDateString(local, options),
    curToNow: curToNow,
    nowToNext: nowToNext,
    nextQuizStarts: nextQuizStarts.toLocaleDateString(local, options),
    totalRevenueStats: totalRevenueStats, //[],
    transactionsMetricStats: transactionsMetricStats, //[]
    transactionsMetricDiffStats: transactionsMetricDiffStats, //[]
    seriesApexLineMetrics: seriesApexLineMetrics, //[]
    categoriesApexLineMetrics: categoriesApexLineMetrics //[]
  }

  resultAllIds[id] = db

  return db
})

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
    metStats[i] = midRangeRate
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

    //some selectedOptions generated more than max length todo swap remove or update to match
    for (var i = 0; i < questionsMetricsArr.length; i++) {
      var metric = questionsMetricsArr[i].toString()
      var metricIdx = Object.keys(metricsru).findIndex(key => key == metric)

      if (counterMetricQuiz != 0)
        metStats[metricIdx] = metStats[metricIdx] + selectedOptionsNumArr[i] / counterMetricQuiz[metricIdx] // //0+5.2+6.4+..
      else {
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
  }

  var selAnsLen = selectedAnswers.length

  for (var i = 0; i < selAnsLen; i++) {
    var selectedAnswer = selectedAnswers[i]

    await CountCohort(selectedAnswer)
  }

  //metStats.map(item => console.log('selAnsLen ' + selAnsLen + ' item ' + item))

  for (var i = 0; i < metStats.length; i++) {
    if (metStats[i] != 0) {
      metStats[i] = metStats[i] / selAnsLen
      console.log('metStats [i] ' + i + ' selAnsLen  ' + selAnsLen)
    } else console.log('metStats [i] ' + i + ' is zero ')
  }

  revStats[1] = (quizSelectedAnswersInCohortHigh / quizCountParticipators) * 100 //high
  revStats[2] = (quizSelectedAnswersInCohortLow / quizCountParticipators) * 100 //low
  revStats[3] = (quizSelectedAnswersInCohortNot / quizCountParticipators) * 100 //not

  return [revStats, metStats]
}
