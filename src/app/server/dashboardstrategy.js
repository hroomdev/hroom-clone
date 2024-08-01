// MUI Imports
import React, { useCallback, cache } from 'react'

import Grid from '@mui/material/Grid'

import ruLocale from 'date-fns/locale/ru'

import { formatDistanceToNow, intervalToDuration, format } from 'date-fns'

import { DashboardBuilder } from '@views/dashboards/dashboard/src/screens/DashboardBuilder'

import DashboardWelcomeCard from '@views/dashboards/dashboard/src/DashboardWelcomeCard'

import { dbQuizAuditoryIdx, dbQuizIdIdx, dbQuizTimeStartSIdx, dbQuizTypeIdx, dbSelectedAnswersIdIdx } from './dbMapping'

import { teamsru } from '@/views/dashboards/dashboard/src/screens/DashboardBuilder/Teams'

import { ratingMax, midRangeRating } from './const'
import {
  getSelectedAnswersByTeamId,
  getSelectedAnswersByQuizId,
  getCurrentQuiz,
  getQuizOrderByIdDesc,
  getQuestGroupTypeBy,
  getSelectedOptions,
  getQuestGroupGroupBy,
  getQuestionMetricBy,
  getQuizById
} from './actions'

import { getMockDashboardData } from './MockData'

// Data Imports

const intervalDataUpd = 1000

import { metricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'

const local = 'ru-RU'

export async function preload(id) {
  console.log(id + 'preload id : getDashboardData... ')

  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  //https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-and-sequential-data-fetching
  await getDashboardData(id)
}

export async function Item(id, mockData) {}

var resultAllIds = []

export async function checkIsAvailable(id) {
  return resultAllIds[id] != null && resultAllIds[id] != undefined && resultAllIds.length >= id - 1
}

export var loading = false

//cache for server calls only this is called from client
export const getDashboardData = async id => {
  console.log('loading false -> set loading true : getDashboardData... ')

  if (loading) {
    console.log('twice call loading quit : dashboardstrategy')

    return undefined
  }

  loading = true

  //if (isAvailable(id)) {
  //}

  var mockData = getMockDashboardData(id)

  mockData.seriesApexLineMetrics = mockData.seriesApexLineMetrics.map((item, index) => {
    item.data = []

    return item
  })

  mockData.categoriesApexLineMetrics = []

  //set cache renewal conditionscheck is available on each new user data must be set false
  var participantsQuizPassed = mockData.participantsQuizPassed
  var participantsQuizAll = mockData.participantsQuizPassed
  var participationPercent = mockData.participationPercent
  var currentQuizStarts = mockData.currentQuizStarts
  var curToNow = mockData.curToNow
  var nowToNext = mockData.nowToNext
  var nextQuizStarts = mockData.nextQuizStarts
  var totalRevenueStats = mockData.totalRevenueStats
  var transactionsMetricStats = mockData.transactionsMetricStats
  var transactionsMetricDiffStats = mockData.transactionsMetricDiffStats
  var teamsMetricStats = mockData.teamsMetricStats
  var teamsMetricDiffStats = mockData.teamsMetricDiffStats
  var teamMetricsDateStart = mockData.teamMetricsDateStart
  var teamMetricsDateEnd = mockData.teamMetricsDateEnd
  var options = mockData.options
  var optionsChart = mockData.optionsChart

  // Vars
  var seriesApexLineMetrics = mockData.seriesApexLineMetrics

  var categoriesApexLineMetrics = mockData.categoriesApexLineMetrics

  var timeStart = mockData.timeStart

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
  var teamDiffStats = teamsMetricDiffStats

  quizes = quizes.filter(q => q != undefined)

  for (var i = quizes.length - 1; i > -1; i--) {
    var quiz = quizes[i]

    var engageResult = await getEngageMetrics(
      quiz,
      cohortsLevelsPercents,
      totalRevenueStats,
      transactionsMetricStats,
      teamsMetricStats
    )

    //console.log('quiz ' + JSON.stringify(quiz) + 'len - 1 ' + (quizes.length - 1) + ' i ' + i)

    var revStats = engageResult[0]
    var metStats = engageResult[1]
    var teamStats = engageResult[2]

    if (i != 0) {
      diffStats = diffStats.map(function (item, index) {
        if (metStats != 0) return metStats[index]

        //var res = metStats[index]
        //return res
      })

      //teamDiffStats = teamStats

      for (var j = 0; j < teamStats.length; j++) {
        for (var k = 0; k < teamStats[j].length; k++) {
          if (teamStats[j][k] != 0) {
            teamDiffStats[j][k] = teamStats[j][k]

            //console.log(i + ' i jk NOT EQUALS ZERO')
          }
        }
      }

      //console.log('engage current ' + totalRevenueStats[5])
    }

    if (i == 0) {
      diffStats = diffStats.map(function (item, index) {
        var res = metStats[index] - item

        return res
      })

      for (var j = 0; j < teamStats.length; j++) {
        for (var k = 0; k < teamStats[j].length; k++) {
          //console.log('teamdiff is ' + teamStats[j][k] + ' minus ' + teamDiffStats[j][k])
          teamDiffStats[j][k] = teamStats[j][k] - teamDiffStats[j][k]
        }
      }

      var engageLast = diffStats.reduce((partialSum, a) => partialSum + a, 0) / 10

      totalRevenueStats[0] = (engageLast / 10) * 100
    }

    if (i == 0) {
      //console.log('i == 0 ')
      totalRevenueStats = revStats
      transactionsMetricStats = metStats

      transactionsMetricDiffStats = diffStats

      teamsMetricStats = teamStats

      teamsMetricDiffStats = teamDiffStats

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
    var dateToLocal = new Date(dateParsed).toLocaleString(local, optionsChart)

    categoriesApexLineMetrics.push(dateToLocal)

    //console.log('push ' + dateToLocal)
    console.log('for  ' + i + ' end')
  }

  //console.log('teamStats length ' + teamStats.length + '  teamsstats ' + teamsMetricDiffStats.length)

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
    categoriesApexLineMetrics: categoriesApexLineMetrics, //[]
    teamsMetricStats: teamsMetricStats,
    teamsMetricDiffStats: teamsMetricDiffStats
  }

  resultAllIds[id] = db

  loading = false

  return db
}

export const getCurrentQuizAuditory = async () => {
  let currentQuizIdAudi = await getCurrentQuizIdAudi()

  let currentQuizId = currentQuizIdAudi[0]
  let currentQuizAudi = currentQuizIdAudi[1]

  var selectedAnswers = await getSelectedAnswersByQuizId(currentQuizId)

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

export const getEngageMetrics = async (
  quiz,
  cohortsLevelsPercents,
  totalRevenueStats,
  metricsStats,
  teamsMetricStats
) => {
  var revStats = totalRevenueStats
  var metStats = metricsStats
  var teamStats = teamsMetricStats

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

  var selectedAnswers = await getSelectedAnswersByQuizId(quizId)

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
    metStats[i] = 0
    var counterMetric = questionsMetricsArr.reduce((accumulator, currentValue) => {
      if (Object.keys(metricsru).at(i) == currentValue) {
        return accumulator + 1
      }

      return accumulator
    }, 0)

    counterMetricQuiz[i] = counterMetric
  }

  //.fill(0)
  var counterTeamMetricQuiz = Array(teamStats[0].length) //[3,7,2,1,8..] число участвующих в этом опросе от каждой команды начиная с 0 до 7ой

  for (var i = 0; i < counterTeamMetricQuiz.length; i++) {
    counterTeamMetricQuiz[i] = 0
  }

  for (var i = 0; i < teamStats.length; i++) {
    for (var j = 0; j < teamStats[i].length; j++) {
      teamStats[i][j] = 0
    }
  }

  for (var i = 0; i < selectedAnswers.length; i++) {
    var selectedAnswerSplittedStr = selectedAnswers[i].toString().split(',')
    var selectedAnswerTeamId = Number.parseInt(selectedAnswerSplittedStr[selectedAnswerSplittedStr.length - 1]) //hack count

    counterTeamMetricQuiz[selectedAnswerTeamId - 1] = counterTeamMetricQuiz[selectedAnswerTeamId - 1] + 1
  }

  //transaction stats metrics END///////////////////////////

  if (quizCountParticipators <= 0) {
    revStats[3] = 0
    revStats[2] = 0
    revStats[1] = 0

    return [revStats, metStats, teamStats]
  }

  const CountCohort = async selectedAnswer => {
    var selectedAnswerSplittedStr = selectedAnswer.toString().split(',')

    var selectedAnswersIdx = await dbSelectedAnswersIdIdx()
    var selectedAnswerId = selectedAnswerSplittedStr[selectedAnswersIdx]

    var selectedAnswerTeamId = Number.parseInt(selectedAnswerSplittedStr[selectedAnswerSplittedStr.length - 1]) //hack count columns selectedAnswers table Depenent

    if (selectedAnswerTeamId == 7) console.log('selectedAnswerTeamId SEVEN')

    var selectedOptions = await getSelectedOptions(selectedAnswerId)

    var selectedOptionsSplittedStr = selectedOptions.toString().split(',')

    //checks for empty values too
    var selectedOptionsNumArr = selectedOptionsSplittedStr.map(str => Number.parseInt(str) || midRangeRating)

    //check for db consistency
    selectedOptionsNumArr = selectedOptionsNumArr.map(num => (num < 0 ? midRangeRating : num))

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

      for (var j = 0; j < teamStats.length; j++) {
        var teamMetric = Object.keys(metricsru).at(j)

        if (teamMetric === metric || teamMetric === 'Engagement') {
          if (teamMetric === 'Engagement') {
            teamStats[j][selectedAnswerTeamId - 1] =
              teamStats[j][selectedAnswerTeamId - 1] +
              selectedOptionsNumArr[i] / counterMetricQuiz.reduce((partialSum, a) => partialSum + a, 0)
          } else {
            teamStats[j][selectedAnswerTeamId - 1] =
              teamStats[j][selectedAnswerTeamId - 1] + selectedOptionsNumArr[i] / counterMetricQuiz[metricIdx]
          }
        }
      }
    }
  }

  var selAnsLen = selectedAnswers.length

  for (var i = 0; i < selAnsLen; i++) {
    var selectedAnswer = selectedAnswers[i]

    await CountCohort(selectedAnswer)
  }

  for (var i = 0; i < metStats.length; i++) {
    if (metStats[i] != 0) {
      metStats[i] = metStats[i] / selAnsLen
    }
  }

  for (var i = 0; i < teamStats.length; i++) {
    for (var j = 0; j < teamStats[i].length; j++) {
      if (j == teamStats[i].length - 1) {
        // console.log('j teamstats last team seven j ' + j + ' not zero IS ' + (teamStats[i][j] != 0))
      }

      if (i == teamStats.length - 1) {
        //engagement summ all other metrics
        if (teamStats[i][j] != 0) {
          teamStats[i][j] = teamStats[i][j] / counterMetricQuiz.reduce((partialSum, a) => partialSum + a, 0)
        }
      } else {
        if (teamStats[i][j] != 0) {
          teamStats[i][j] = teamStats[i][j] / counterTeamMetricQuiz[j]
        }
      }
    }
  }

  revStats[1] = (quizSelectedAnswersInCohortHigh / quizCountParticipators) * 100 //high
  revStats[2] = (quizSelectedAnswersInCohortLow / quizCountParticipators) * 100 //low
  revStats[3] = (quizSelectedAnswersInCohortNot / quizCountParticipators) * 100 //not
  //console.log('return for quiz ' + quiz)

  return [revStats, metStats, teamStats]
}
