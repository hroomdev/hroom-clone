/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */
'use server'

// Data Imports

// db.js

import { connect } from 'react-redux'

import { validateSort } from '@formkit/drag-and-drop'

import { db as eCommerceData } from '@/fake-db/apps/ecommerce'
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as invoiceData } from '@/fake-db/apps/invoice'
import { db as userData } from '@/fake-db/apps/user-list'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/user-profile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widget-examples'
import { db as questionsData } from '@/fake-db/pages/quiz'
import {
  dbQuizAuditoryIdx,
  dbQuizGroupGroupIdx,
  dbQuizGroupTypeIdx,
  dbQuizIdIdx,
  dbQuizTimeStartEIdx,
  dbQuizTimeStartSIdx,
  dbQuizTypeIdx,
  dbSelectedAnswersIdIdx,
  dbSelectedAnswersSelectedOptionsIdx
} from './dbMapping'

import { ratingMax } from './const'

const { Client } = require('pg')

//todo: refactor current.... to by id etc

//also import questiontype
export const createSelectedAnswersCurrentQuiz = async selectedOptionsStr => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  let currentQuizIdAudi = await getCurrentQuizIdAudi()

  let currentQuizId = currentQuizIdAudi[0]
  let currentQuizAudi = currentQuizIdAudi[1]

  await client.connect()
  const text = 'INSERT INTO "public"."selectedAnswers" ("selectedOptions","quizId") VALUES($1, $2) RETURNING *'

  const values = [selectedOptionsStr, currentQuizId]

  const query = {
    // give the query a unique name
    text: text,
    rowMode: 'array',
    values: values
  }

  var r = ''

  await client
    .query(query) // your query string here
    .then(result => {
      r = result.rows[0]
      console.log(result)
    }) // your callback here
    .catch(e => console.error(e.stack)) // your callback here
    .then(() => client.end())

  return r
}

export const createQuiz = async (timeStart, type, auditory) => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  await client.connect()

  const text = 'INSERT INTO "public"."quiz" ("timestart","type","auditory") VALUES($1, $2, $3) RETURNING *'
  const values = [timeStart, type, auditory]

  const query = {
    // give the query a unique name
    text: text,
    rowMode: 'array',
    values: values
  }

  var res = ''

  await client
    .query(query) // your query string here
    .then(result => {
      res = result.rows[0]
    }) // your callback here
    .catch(e => console.error(e.stack)) // your callback here
    .then(() => client.end())

  return res
}

export const getEcommerceData = async () => {
  return eCommerceData
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  return invoiceData
}

export const getUserData = async () => {
  return userData
}

export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}

export const getQuestionGroupsBy = async groupId => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  const queryGroup = {
    text: 'SELECT * FROM "public"."question-groups" WHERE "public"."question-groups"."id" != 0',
    rowMode: 'array'
  }

  var resultQuestionGroup = 'empty'

  try {
    await client.connect()
    var res = await client.query(queryGroup)

    resultQuestionGroup = res.rows[groupId - 1] //id of a row less then id of any table by one
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  return resultQuestionGroup
}

export const getQuestGroupGroupBy = async groupId => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  const queryGroup = {
    text: 'SELECT "public"."question-groups"."group" FROM "public"."question-groups" WHERE "public"."question-groups"."id" != 0',
    rowMode: 'array'
  }

  var resultQuestionGroup = 'empty'

  try {
    await client.connect()
    var res = await client.query(queryGroup)

    resultQuestionGroup = res.rows[groupId - 1] //id of a row less then id of any table by one
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  return resultQuestionGroup
}

export const getQuestGroupTypeBy = async groupId => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  const queryGroup = {
    text: 'SELECT "public"."question-groups"."type" FROM "public"."question-groups" WHERE "public"."question-groups"."id" != 0',
    rowMode: 'array'
  }

  var resultQuestionGroup = 'empty'

  try {
    await client.connect()
    var res = await client.query(queryGroup)

    resultQuestionGroup = res.rows[groupId - 1] //id of a row less then id of any table by one
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  return resultQuestionGroup
}

const getTypeQuestions = async questionIdsNums => {
  const queryQuestions = {
    text: 'SELECT "public"."question-list"."id","public"."question-list"."Type","public"."question-list"."Question" FROM "public"."question-list" WHERE "public"."question-list"."id" = ANY ($1)',
    values: [questionIdsNums],
    rowMode: 'array'
  }

  var typeQuestions = []

  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  try {
    await client.connect()
    var res = await client.query(queryQuestions)

    for (var i = 0; i < questionIdsNums.length; i++) {
      var id = questionIdsNums[i]

      for (var j = 0; j < res.rows.length; j++) {
        var idtypequestion = res.rows[j]

        var idtypequestionSplittedStr0 = idtypequestion.toString().split(',')[0]
        var idtypequestionSplittedStr1 = idtypequestion.toString().split(',')[1]
        var idtypequestionSplittedStr2 = idtypequestion.toString().split(',')[2]

        if (!idtypequestionSplittedStr1 || idtypequestionSplittedStr1 === '' || idtypequestionSplittedStr1 === ' ') {
          idtypequestionSplittedStr1 = 'dots5'
        }

        if (id == idtypequestionSplittedStr0) {
          if (idtypequestionSplittedStr1 == '') {
            console.error('doesnt reassigns')
          }

          var typeQuestion = [idtypequestionSplittedStr1, idtypequestionSplittedStr2]

          typeQuestions.push(typeQuestion)

          //types.push(idtypequestionSplittedStr1)
          //questions.push(idtypequestionSplittedStr2)

          break
        }
      }
    }
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  return typeQuestions
}

const getAnswers = async (questionIdsNums, types) => {
  const queryAnswers = {
    text: 'SELECT "public"."question-types"."type","public"."question-types"."answer1","public"."question-types"."answer2","public"."question-types"."answer3","public"."question-types"."answer4","public"."question-types"."answer5" FROM "public"."question-types" WHERE "public"."question-types"."id" != 0',
    rowMode: 'array'
  }

  var typeAnswersSplittedStrs = []

  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  try {
    await client.connect()
    var resAnswers = await client.query(queryAnswers)

    for (var i = 0; i < resAnswers.rows.length; i++) {
      var typeanswers = resAnswers.rows[i]

      typeAnswersSplittedStrs.push(typeanswers)
    }
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  var answers = []

  for (var i = 0; i < questionIdsNums.length; i++) {
    var thisAnswers = []

    for (var j = 0; j < typeAnswersSplittedStrs.length; j++) {
      var ansTypes = typeAnswersSplittedStrs[j].toString().split(',')
      var ansType = ansTypes[0]

      if (ansType == types[i]) {
        var ans1 = typeAnswersSplittedStrs[j].toString().split(',')[1]
        var ans2 = typeAnswersSplittedStrs[j].toString().split(',')[2]
        var ans3 = typeAnswersSplittedStrs[j].toString().split(',')[3]
        var ans4 = typeAnswersSplittedStrs[j].toString().split(',')[4]
        var ans5 = typeAnswersSplittedStrs[j].toString().split(',')[5]

        thisAnswers.push(ans1)
        thisAnswers.push(ans2)
        thisAnswers.push(ans3)
        thisAnswers.push(ans4)
        thisAnswers.push(ans5)

        break
      }
    }

    answers.push(thisAnswers)
  }

  return answers
}

export const getQuestData = async () => {
  //values for questionGroups is 'A' column here https://docs.google.com/spreadsheets/d/1TbnTMajgWkNOg1-ZeRZJbNwVyfLDTQufz9aYtWjmDAw/edit?gid=1027310322#gid=1027310322
  //data layout @/fake-db/pages/quiz' questionsData
  const maxQuestGroupId = 2
  var quizQuestions = []

  for (var questionGroupId = 1; questionGroupId <= maxQuestGroupId; questionGroupId++) {
    var resultQuestionGroup = await getQuestGroupGroupBy(questionGroupId)

    var splittedStr = resultQuestionGroup.toString().split(',')

    var questionIdsNums = splittedStr.map(s => {
      return Number.parseInt(s)
    })

    questionIdsNums.map((n, i) => {
      //console.log(id + ' id | n' + n)
    })

    var typeQuestions = await getTypeQuestions(questionIdsNums)
    var types = []
    var questions = []

    for (var j = 0; j < typeQuestions.length; j++) {
      var type = typeQuestions[j][0]
      var question = typeQuestions[j][1]

      types.push(type)
      questions.push(question)
    }

    var answers = await getAnswers(questionIdsNums, types)

    var quizIdQuestions = []

    var imgSources = []

    for (var j = 0; j < questionIdsNums.length; j++) {
      if (types[j].includes('image')) {
        imgSources = [
          '/images/illustrations/characters/q1.png',
          '/images/illustrations/characters/q2.png',
          '/images/illustrations/characters/q3.png',
          '/images/illustrations/characters/q4.png',
          '/images/illustrations/characters/q4.png'
        ]
      }

      var quizQuestion = {
        type: types[j],
        subtitle: questions[j],
        answers: answers[j],
        imgSrcs: types[j].includes('image') ? imgSources : undefined
      }

      quizIdQuestions.push(quizQuestion)
    }

    quizQuestions.push(quizIdQuestions)
  }

  return quizQuestions
}

export const getCurrentQuizTimeStart = async () => {
  let currentQuiz = await getCurrentQuiz()

  var splittedStr = currentQuiz.toString().split(',')

  var currentQuizTimeStart = Date.parse(splittedStr[dbQuizTimeStartSIdx] + splittedStr[dbQuizTimeStartEIdx])

  return currentQuizTimeStart
}

export const getCurrentQuizAuditory = async () => {
  let currentQuizIdAudi = await getCurrentQuizIdAudi()

  let currentQuizId = currentQuizIdAudi[0]
  let currentQuizAudi = currentQuizIdAudi[1]

  var selectedAnswers = await getSelectedAnswersBy(currentQuizId)

  return [selectedAnswers.length, currentQuizAudi]
}

export const getCurrentQuizEngageCohort = async (cohortsLevelsPercents, cohortsDistributionPercents) => {
  //if (cohortsLevelsPercents.length != 3) {
  //  throw 'ERROR coohorts percent levels MUST BE THREE NOT LOW HIGH '
  //}
  //
  //if (cohortsDistributionPercents.length != cohortsLevelsPercents.length) {
  //  throw (
  //    'ERROR coohorts distribution percent levels MUST BE same as levelspercent  which is ' +
  //    cohortsLevelsPercents.length
  //  )
  //}

  console.log(cohortsLevelsPercents.length)
  console.log(cohortsDistributionPercents.length)

  let quiz = await getQuizOrderByIdDesc(1, 0)

  var quizSplittedStr = quiz.toString().split(',')
  var quizGroupId = quizSplittedStr[dbQuizTypeIdx]

  //console.log('quizGroupId ' + quizGroupId)
  let quizGroupType = await getQuestGroupTypeBy(quizGroupId)

  //console.log('quizGroupType ' + quizGroupType)
  //console.log('quizGroupType len' + quizGroupType.length)

  var quizTypeQuest = quizGroupType.toString().split('-') //   month-20q-1m

  //console.log('quizTypeQuest ' + quizTypeQuest)

  var quizTypeQuestNumSepar = quizTypeQuest[1].toString() //

  //console.log('quizTypeQuestNumSepar ' + quizTypeQuestNumSepar)

  var quizTypeQuestNumStr = quizTypeQuestNumSepar.substring(0, quizTypeQuestNumSepar.length - 1)

  //console.log('quizTypeQuestNumStr ' + quizTypeQuestNumStr)

  var quizCountQuestions = Number.parseInt(quizTypeQuestNumStr) //a

  //console.log('quizCountQuestions ' + quizCountQuestions)

  var quizMaxRating = quizCountQuestions * ratingMax //b

  //console.log('quizMaxRating ' + quizMaxRating)

  let quizId = quizSplittedStr[dbQuizIdIdx]

  //console.log('quizId ' + quizId)

  var selectedAnswers = await getSelectedAnswersBy(quizId)

  //console.log('selectedAnswers ' + selectedAnswers)

  var countParticipators = selectedAnswers.length //c

  //console.log('countParticipators ' + countParticipators)

  var quizSelectedAnswersInCohortNot = 0 //dnot
  var quizSelectedAnswersInCohortLow = 0 //dlow
  var quizSelectedAnswersInCohortHigh = 0 //dhigh

  if (countParticipators <= 0) {
    cohortsDistributionPercents[0] = 0
    cohortsDistributionPercents[1] = 0
    cohortsDistributionPercents[2] = 0

    return cohortsDistributionPercents
  }

  const CountCohort = async selectedAnswer => {
    //console.log('selectedAnswer ' + selectedAnswer)

    var selectedAnswerSplittedStr = selectedAnswer.toString().split(',')

    //console.log('selectedAnswerSplittedStr ' + selectedAnswerSplittedStr)

    var selectedAnswerId = selectedAnswerSplittedStr[dbSelectedAnswersIdIdx]

    //console.log('selectedAnswerId ' + selectedAnswerId)

    var selectedOptions = await getSelectedOptions(selectedAnswerId)

    var selectedOptionsSplittedStr = selectedOptions.toString().split(',')

    //console.log('selectedOptionsSplittedStr leng ' + selectedOptionsSplittedStr.length)

    var selectedAnswersSummOptions = selectedOptionsSplittedStr
      .map(str => Number.parseInt(str))
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)

    //console.log('selectedAnswersSummOptions  ' + selectedAnswersSummOptions)

    var ratingQuizPercentInt = (selectedAnswersSummOptions / quizMaxRating) * 100 //f

    //console.log(
    //  '   ratingQuizPercentInt ' +
    //    ratingQuizPercentInt +
    //    'level 0 ' +
    //    cohortsLevelsPercents[0] +
    //    ' level 1 ' +
    //    cohortsLevelsPercents[1]
    //)

    //33 66
    if (ratingQuizPercentInt <= cohortsLevelsPercents[0]) {
      quizSelectedAnswersInCohortNot = quizSelectedAnswersInCohortNot + 1

      //console.log('   not  ++' + quizSelectedAnswersInCohortNot)
    } else if (ratingQuizPercentInt <= cohortsLevelsPercents[1]) {
      quizSelectedAnswersInCohortLow = quizSelectedAnswersInCohortLow + 1

      //console.log('   low  ++' + quizSelectedAnswersInCohortLow)
    } else {
      quizSelectedAnswersInCohortHigh = quizSelectedAnswersInCohortHigh + 1

      //console.log('   high  ++' + quizSelectedAnswersInCohortHigh)
    }
  }

  for (var i = 0; i < selectedAnswers.length; i++) {
    var selectedAnswer = selectedAnswers[i]

    await CountCohort(selectedAnswer)
  }

  console.log('   not  ' + quizSelectedAnswersInCohortNot)
  console.log('   low  ' + quizSelectedAnswersInCohortLow)
  console.log('   high  ' + quizSelectedAnswersInCohortHigh)
  console.log('   participators  ' + countParticipators)

  var chpnot = quizSelectedAnswersInCohortNot / countParticipators
  var chplow = quizSelectedAnswersInCohortLow / countParticipators
  var chphigh = quizSelectedAnswersInCohortHigh / countParticipators

  console.log('   chpnot  ' + chpnot)
  console.log('   chplow  ' + chplow)
  console.log('   chphigh  ' + chphigh)

  return [chpnot * 100, chplow * 100, chphigh * 100]
}

export const getCurrentQuizIdAudi = async () => {
  try {
    let currentQuiz = await getCurrentQuiz()
    var splittedStr = currentQuiz.toString().split(',')

    for (var i = 0; i < splittedStr.length; i++) {}

    var currentQuizId = Number.parseInt(splittedStr[dbQuizIdIdx])
    var currentQuizAuditory = Number.parseInt(splittedStr[dbQuizAuditoryIdx])
  } catch (e) {
    console.error(e.stack)
  } finally {
  }

  return [currentQuizId, currentQuizAuditory]
}

export const getSelectedAnswersBy = async quizId => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  const selectedAnswersIds = {
    text: 'SELECT * FROM "public"."selectedAnswers" WHERE "public"."selectedAnswers"."quizId" = $1',
    values: [quizId],
    rowMode: 'array'
  }

  var selectedAnswers = []

  try {
    await client.connect()
    var res = await client.query(selectedAnswersIds)

    //console.log('res row length selected answers count :actions.js ' + res.rows.length)

    if (res.rows.length <= 0) {
      //console.log('noone yet participated in  quizId' + quizId)

      return selectedAnswers
    }

    selectedAnswers = res.rows
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  return selectedAnswers
}

export const getSelectedOptions = async answersId => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  const selectedOptionsQuery = {
    text: 'SELECT "public"."selectedAnswers"."selectedOptions" FROM "public"."selectedAnswers" WHERE "public"."selectedAnswers"."id" = $1',
    values: [answersId],
    rowMode: 'array'
  }

  var selectedOptions = ''

  try {
    await client.connect()
    var res = await client.query(selectedOptionsQuery)

    //console.log('res row length selected answers count :actions.js ' + res.rows.length)

    if (res.rows.length <= 0) {
      //console.log('noone yet participated in  quizId' + answersId)

      return selectedOptions
    }

    selectedOptions = res.rows[0]
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  return selectedOptions
}

export const getQuizOrderByIdDesc = async (limit, offset) => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  const queryCurrentQuizId = {
    text: 'SELECT * FROM "public"."quiz" ORDER BY "public"."quiz"."id" DESC LIMIT $1 OFFSET $2',
    values: [limit, offset],
    rowMode: 'array'
  }

  let currentQuiz = 'empty'

  try {
    await client.connect()
    var res = await client.query(queryCurrentQuizId)

    currentQuiz = res.rows[0]
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()

    return currentQuiz
  }
}

export const getCurrentQuiz = async () => {
  return await getQuizOrderByIdDesc(1, 0)
}
