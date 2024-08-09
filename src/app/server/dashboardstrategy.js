// MUI Imports
import React, { useCallback, cache } from 'react'

import Grid from '@mui/material/Grid'

import ruLocale from 'date-fns/locale/ru'

import { formatDistanceToNow, intervalToDuration, format } from 'date-fns'

import generateOptions, { getRandomInt } from './../../../src/components/dialogs/create-app/GenerateQuizSelectedOptions'
import { checkValidJoinedStr } from './../../../src/components/dialogs/create-app/TestSelectedOptionsValidity'

import { DashboardBuilder } from '@views/dashboards/dashboard/src/screens/DashboardBuilder'

import DashboardWelcomeCard from '@views/dashboards/dashboard/src/DashboardWelcomeCard'

import { dbQuizAuditoryIdx, dbQuizIdIdx, dbQuizTimeStartSIdx, dbQuizTypeIdx, dbSelectedAnswersIdIdx } from './dbMapping'

import { teamsru } from '@/views/dashboards/dashboard/src/screens/DashboardBuilder/Teams'
import { checkIsAvailable, Item } from '@/app/server/dashboarddbcache'

import { ratingMax, midRangeRating, cohortsLevelsPercents, cohortsAcutesAbs } from './const'

import { getStatsMetrics } from '@/app/server/statistics'

import {
  getSelectedAnswersByOrderDescQuizId,
  getCurrentQuiz,
  getQuizOrderByIdDesc,
  getQuestGroupTypeBy,
  getSelectedOptions,
  getQuestGroupGroupBy,
  getQuestionMetricSubMetricQuestionBy,
  getEmployees,
  createSelectedAnswersCurrentQuiz,
  createStatistics,
  createQuiz
} from './actions'

import { getMockDashboardData } from './MockData'

// Data Imports

const intervalDataUpd = 1000

import { metricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'
import { submetricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Submetrics'

const local = 'ru-RU'

export const generateStatistics = async (limitQuiz, limitAnswers) => {
  console.log('generateStatistics  ' + limitQuiz + ' limitAnswers ' + limitAnswers)

  let quizes = await getQuizOrderByIdDesc(limitQuiz, 0)

  quizes = quizes.filter(q => {
    return q !== undefined
  })

  for (var quizI = quizes.length - 1; quizI > -1; quizI--) {
    var quiz = quizes[quizI]
    var quizSplittedStr = quiz.toString().split(',')

    var quizIdIdx = await dbQuizIdIdx()
    let quizId = quizSplittedStr[quizIdIdx]

    var selectedAnswers = await getSelectedAnswersByOrderDescQuizId(quizId, limitAnswers)
    var selAnsLen = selectedAnswers.length

    for (var i = 0; i < selAnsLen; i++) {
      var selectedAnswer = selectedAnswers[i]

      var statsResult = await getStatsMetrics(quiz, selectedAnswer)

      //var stat_id = 1 //increase  auto
      var survey_id = statsResult[0] // first from quiz table 1,15-24
      var employee_id = statsResult[1] //   1,2,3,4 query from selectedAnswers
      var engagement = statsResult[2] //engagement_score calculate
      var satisfaction = statsResult[3] //engagement_score calculate
      var loyalty = statsResult[4]
      var total_answers = statsResult[5] //query from selectedAnswers
      var negative_reponses = statsResult[6] //always zero

      let c = createStatistics(
        survey_id,
        employee_id,
        engagement,
        satisfaction,
        loyalty,
        total_answers,
        negative_reponses
      )

      console.log('create stats  ' + c)

      //break
    }

    //break
  }
}

export const generateSelectedOptions = async () => {
  console.log('onclick menuitem')

  var countGenerated = 20
  var maximum = 10
  var generatedOptions = generateOptions(countGenerated, maximum)
  let optionsStr = generatedOptions.join(',')

  var maxEmps = 10

  var employeeId = getRandomInt(maxEmps)

  var employeesres = await getEmployees(maxEmps)

  var employees = employeesres.rows

  console.log('employees l ' + employees.length + 'employeeId ' + employeeId)

  var departmentId = 7

  for (var i = 0; i < employees.length; i++) {
    if (i == employeeId - 1) {
      departmentId = employees[i]['department_id']

      console.log('departmentId ' + departmentId + ' ')
    }
  }

  console.log('agen emplid ' + employeeId + 'dep id ' + departmentId)

  if (!checkValidJoinedStr(optionsStr, countGenerated, 1, maximum, 0)) {
    console.log('generated quiz is not valid! not sending to db')
  } else {
    let c = await createSelectedAnswersCurrentQuiz(optionsStr, employeeId, departmentId)

    console.log('options   ' + c)
  }
}

export const getDashboardData = async id => {
  console.log('loading false -> set loading true : getDashboardData... ')

  //cache forever
  //if ((await checkIsAvailable(id)) == true) {
  //  console.log('available cached version return : dashboardstrategy')
  //
  //  return await Item(id)
  //}

  var mockData = getMockDashboardData(id)

  mockData.seriesApexLineMetrics = mockData.seriesApexLineMetrics.map((item, index) => {
    item.data = []

    return item
  })

  mockData.categoriesApexLineMetrics = []
  mockData.acutelys = []

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
  var acutelys = mockData.acutelys
  var teamsMetricStory = mockData.teamsMetricStory

  teamsMetricStory.dateStamp = []
  teamsMetricStory.stats = []

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

  quizes = quizes.filter(q => {
    return q !== undefined
  })

  //console.log('before start acutelys  ' + JSON.stringify(acutelys))

  for (var quizI = quizes.length - 1; quizI > -1; quizI--) {
    var quiz = quizes[quizI]

    var engageResult = await getEngageMetrics(
      quiz,
      totalRevenueStats,
      transactionsMetricStats,
      teamsMetricStats,
      acutelys
    )

    //console.log('quiz ' + JSON.stringify(quiz) + 'len - 1 ' + (quizes.length - 1) + ' i ' + i)

    var revStats = engageResult[0]
    var metStats = engageResult[1]
    var teamStats = engageResult[2]

    acutelys = engageResult[3]

    //console.log(quizI + 'acutelys result acutes ' + JSON.stringify(acutelys))

    if (quizI != 0) {
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

    //stats related to difference in moment info
    if (quizI == 0) {
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

    //overall stats
    if (quizI == 0) {
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

    teamsMetricStory.dateStamp.push(quizStartsAtDate)

    //console.log('team stats json i' + i + ' teamsstats ' + JSON.stringify(teamStats))
    teamsMetricStory.stats.push(teamStats)

    categoriesApexLineMetrics.push(dateToLocal)

    //console.log('push ' + dateToLocal)
    //console.log('for  ' + quizI + ' end')
  }

  acutelys = pickTopMostByCohortAbsDataSubAssArr(acutelys)

  //format - remove 'id' fields and translate metric and submetric to local language
  acutelys = acutelys.map(item => {
    return Object.keys(item).reduce((acc, key) => {
      if (key !== 'id') {
        if (key == 'metric') {
          var metric = item[key]
          var value = metricsru[metric]

          acc[key] = value
        } else if (key == 'submetric') {
          var submetric = item['submetric']
          var value = submetricsru[submetric]

          acc[key] = value
        } else acc[key] = item[key]
      }

      return acc
    }, {})
  })

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
    teamsMetricDiffStats: teamsMetricDiffStats,
    acutelys: acutelys,
    teamsMetricStory: mockData.teamsMetricStory
  }

  //loading = false

  console.log('end db sample ' + id + ' checkisavail ' + (await checkIsAvailable(id))) //+ JSON.stringify(db)

  return db
}

export const getCurrentQuizAuditory = async () => {
  let currentQuizIdAudi = await getCurrentQuizIdAudi()

  let currentQuizId = currentQuizIdAudi[0]
  let currentQuizAudi = currentQuizIdAudi[1]

  var selectedAnswers = await getSelectedAnswersByOrderDescQuizId(currentQuizId, currentQuizAudi)

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

    console.log('quizIdIdx' + quizIdIdx)

    var currentQuizId = Number.parseInt(splittedStr[quizIdIdx])

    console.log('currentQuizId' + currentQuizId)

    var auditoryIdx = await dbQuizAuditoryIdx()

    var currentQuizAuditory = Number.parseInt(splittedStr[auditoryIdx])
  } catch (e) {
    console.error(e.stack)
  } finally {
  }

  return [currentQuizId, currentQuizAuditory]
}

export const getEngageMetrics = async (quiz, totalRevenueStats, metricsStats, teamsMetricStats, acutelys) => {
  var revStats = totalRevenueStats
  var metStats = metricsStats
  var teamStats = teamsMetricStats

  //console.log('quiz' + quiz)
  var quizSplittedStr = quiz.toString().split(',')

  var quizTypeIdx = await dbQuizTypeIdx()

  var quizGroupId = quizSplittedStr[quizTypeIdx]

  var auditoryIdx = await dbQuizAuditoryIdx()

  var quizAuditory = quizSplittedStr[auditoryIdx]

  let quizGroupType = await getQuestGroupTypeBy(quizGroupId)

  var quizTypeQuest = quizGroupType.toString().split('-') //   month-20q-1m

  var quizTypeQuestNumSepar = quizTypeQuest[1].toString() //

  var quizTypeQuestNumStr = quizTypeQuestNumSepar.substring(0, quizTypeQuestNumSepar.length - 1)

  var quizCountQuestions = Number.parseInt(quizTypeQuestNumStr) //a

  var quizMaxRating = quizCountQuestions * ratingMax //b

  var quizIdIdx = await dbQuizIdIdx()
  let quizId = quizSplittedStr[quizIdIdx]

  var selectedAnswers = await getSelectedAnswersByOrderDescQuizId(quizId, quizAuditory)

  var quizCountParticipators = selectedAnswers.length //c

  var quizSelectedAnswersInCohortNot = 0 //dnot
  var quizSelectedAnswersInCohortLow = 0 //dlow
  var quizSelectedAnswersInCohortHigh = 0 //dhigh

  //transactions stats START/////////////////////////////////////
  let quizGroupGroup = await getQuestGroupGroupBy(quizGroupId) //'1,2,3,4,5,6,32'..

  var questionsIdsStrsArr = quizGroupGroup.toString().split(',') //['1','2','3'..]

  var questionsIdsArr = questionsIdsStrsArr.map(qIdStr => Number.parseInt(qIdStr)) //[1,2,3..]

  var questionsMetricsArr = []
  var questionsSubMetricArr = []
  var questionsQuestionArr = []

  await Promise.all(
    // eslint-disable-next-line lines-around-comment
    //['Relationship with Peers','Wellness',..]
    questionsIdsArr.map(async qId => {
      var qMetricSubMetricQuestion = await getQuestionMetricSubMetricQuestionBy(qId)
      var strArr = qMetricSubMetricQuestion.toString().split(',')

      questionsMetricsArr.push(strArr[0])
      questionsSubMetricArr.push(strArr[1])
      questionsQuestionArr.push(strArr[2])

      //console.log('added metric ' + strArr[0] + ' sub ' + strArr[1] + 'q ' + strArr[2])
    })
  )

  for (var i = 0; i < questionsIdsArr.length; i++) {
    var qId = questionsIdsArr[i]
    var data = [0, 0, 0, 0, 0]
    var question = questionsQuestionArr[i]
    var subMetric = questionsSubMetricArr[i]
    var metric = questionsMetricsArr[i]

    var acuteIDWithQId = -1

    acutelys.map(item => {
      Object.keys(item).map(key => {
        var index = item['id']

        if (index == qId) acuteIDWithQId = index
      })
    })

    if (acuteIDWithQId == -1) {
      acutelys.push({
        id: qId,
        data: data,
        question: question,
        submetric: subMetric,
        metric: metric
      })
    }
  }

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
    var selectedAnswerTeamId = Number.parseInt(selectedAnswerSplittedStr[selectedAnswerSplittedStr.length - 2]) //hack count minus two db column dependent

    counterTeamMetricQuiz[selectedAnswerTeamId - 1] = counterTeamMetricQuiz[selectedAnswerTeamId - 1] + 1
  }

  //transaction stats metrics END///////////////////////////

  if (quizCountParticipators <= 0) {
    revStats[3] = 0
    revStats[2] = 0
    revStats[1] = 0

    //console.log('no one is involved in participation zero acutelys')

    return [revStats, metStats, teamStats, acutelys]
  }

  const CountCohort = async selectedAnswer => {
    var selectedAnswerSplittedStr = selectedAnswer.toString().split(',')

    var selectedAnswersIdx = await dbSelectedAnswersIdIdx()
    var selectedAnswerId = selectedAnswerSplittedStr[selectedAnswersIdx]

    var selectedAnswerTeamId = Number.parseInt(selectedAnswerSplittedStr[selectedAnswerSplittedStr.length - 2]) //hack count columns selectedAnswers table Depenent

    //if (selectedAnswerTeamId == 7) console.log('selectedAnswerTeamId SEVEN')

    var selectedOptions = await getSelectedOptions(selectedAnswerId)

    var selectedOptionsSplittedStr = selectedOptions.toString().split(',')

    //checks for empty values too
    var selectedOptionsNumArr = selectedOptionsSplittedStr.map(str => Number.parseInt(str) || 0)

    //check for db consistency
    selectedOptionsNumArr = selectedOptionsNumArr.map(num => (num < 0 ? 0 : num))

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

    //acutely data collect
    if (questionsIdsArr.length > selectedOptionsNumArr.length) {
      console.error('answers less than questions')
    }

    for (var i = 0; i < questionsIdsArr.length; i++) {
      var qId = questionsIdsArr[i]

      var selectedOption = selectedOptionsNumArr[i]

      var bucket = -1

      for (var j = 0; j < cohortsAcutesAbs.length; j++) {
        if (selectedOption < cohortsAcutesAbs[j]) {
          bucket = j
          break
        }
      }

      acutelys.map(item => {
        if (item.id == qId) {
          item.data[bucket] = item.data[bucket] + 1

          return item
        }
      })
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

  return [revStats, metStats, teamStats, acutelys]
}

const pickTopMostByCohortAbsDataSubAssArr = obj => {
  var maxedArr = []

  var maxId = [-1, -1, -1, -1, -1]
  var maximums = [-1, -1, -1, -1, -1]

  obj.map(item => {
    Object.keys(item).map(key => {
      var index = item['id']

      if (key == 'data') {
        if (item[key][0] > maximums[0]) {
          maxId[0] = index
          maximums[0] = item[key][0]
        }

        if (item[key][1] > maximums[1]) {
          maxId[1] = index
          maximums[1] = item[key][1]
        }

        if (item[key][2] > maximums[2]) {
          maxId[2] = index
          maximums[2] = item[key][2]
        }

        if (item[key][3] > maximums[3]) {
          maxId[3] = index
          maximums[3] = item[key][2]
        }

        if (item[key][4] > maximums[4]) {
          maxId[4] = index
          maximums[4] = item[key][4]
        }
      }
    })
  })

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < obj.length; j++) {
      var index = obj[j]['id']

      if (index == maxId[i]) {
        maxedArr.push(obj[j])
        break
      }
    }
  }

  return maxedArr
}
