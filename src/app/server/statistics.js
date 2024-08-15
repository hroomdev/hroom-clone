import { metricsru } from './../../../src/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'

import {
  getLastStartedSurvey,
  getQuestGroupGroupBy,
  getQuestGroupTypeBy,
  getQuestionMetricSubMetricQuestionBy,
  getSelectedAnswersByOrderDescQuizId,
  getSelectedOptions,
  getStartedQuizesOrderByIdDesc
} from './actions'

import {
  dbQuizAuditoryIdx,
  dbQuizIdIdx,
  dbQuizTimeStartSIdx,
  dbQuizTypeIdx,
  dbSelectedAnswersIdIdx
} from '@/app/server/dbMapping'

export const getStatsMetrics = async (quiz, selectedAnswer) => {
  //test
  var metStats = [1.1, 2.2, 3.3, 7.7, 7.8, 7.9, 8.0, 3.3, 5.0, 8.8]

  //var stat_id = 1 //increase  auto
  var survey_id = -1 // first from quiz table 1,15-24
  var employee_id = -1 //   1,2,3,4 query from selectedAnswers

  var engagement = -1 //engagement_score calculate
  var satisfaction = -1 //engagement_score calculate
  var loyalty = -1

  var total_answers = -1 //query from selectedAnswers

  var negative_reponses = 0 //always zero db arch

  //console.log('quiz' + quiz)
  var quizSplittedStr = quiz.toString().split(',')

  var quizTypeIdx = await dbQuizTypeIdx()
  var quizGroupId = quizSplittedStr[quizTypeIdx]

  let quizGroupType = await getQuestGroupTypeBy(quizGroupId)

  var quizTypeQuest = quizGroupType.toString().split('-') //   month-20q-1m

  var quizTypeQuestNumSepar = quizTypeQuest[1].toString() //

  var quizTypeQuestNumStr = quizTypeQuestNumSepar.substring(0, quizTypeQuestNumSepar.length - 1)

  var quizCountQuestions = Number.parseInt(quizTypeQuestNumStr) //a

  //var quizMaxRating = quizCountQuestions * ratingMax //b

  var quizIdIdx = await dbQuizIdIdx()
  let quizId = quizSplittedStr[quizIdIdx]

  var auditoryId = await dbQuizAuditoryIdx()
  var quizAuditory = quizSplittedStr[auditoryId]

  survey_id = quizId //out parameter

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

  //var selectedAnswerSplittedStr = selectedAnswer['']

  var selectedAnswerId = selectedAnswer['id']

  var empId = selectedAnswer['employee_id']

  employee_id = Number.parseInt(empId)

  var selectedOptions = await getSelectedOptions(selectedAnswerId)

  var selectedOptionsSplittedStr = selectedOptions.toString().split(',')

  //checks for empty values too
  var selectedOptionsNumArr = selectedOptionsSplittedStr.map(str => Number.parseInt(str) || 0)

  //check for db consistency
  selectedOptionsNumArr = selectedOptionsNumArr.map(num => (num < 0 ? 0 : num))

  total_answers = selectedOptionsNumArr.length

  var selectedAnswersSummOptions = selectedOptionsNumArr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)

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

  //acutely data collect
  if (questionsIdsArr.length > selectedOptionsNumArr.length) {
    console.error('answers less than questions')
  }

  //Metrics.jsx

  //Satisfaction: 'Удовлетворенность', 0
  //Ambassadorship: 'Лояльность', 1
  //Happiness: 'Счастье', 2
  //'Relationship with Manager': 'Отношения с руководителем', 3
  //Wellness: 'Самочувствие', 4
  //'Relationship with Peers': 'Отношения с коллегами', 5
  //'Personal Growth': 'Личностный рост', 6
  //Alignment: 'Согласованность', 7
  //Recognition: 'Признание', 8
  //Feedback: 'Обратная связь', 9
  //Engagement: 'Вовлеченность' 10

  console.log(JSON.stringify('metStats ' + metStats))

  satisfaction = metStats[0]
  loyalty = metStats[1]

  engagement = metStats.reduce((partialSum, a) => partialSum + a, 0) / quizCountQuestions

  return [survey_id, employee_id, engagement, satisfaction, loyalty, total_answers, negative_reponses]
}
