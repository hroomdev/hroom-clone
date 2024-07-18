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

const { Client } = require('pg')

//also import questiontype
export const createSelectedAnswers = async (selectedOptionsStr, quizId) => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  await client.connect()
  const text = 'INSERT INTO "public"."selectedAnswers" ("selectedOptions","quizId") VALUES($1, $2) RETURNING *'

  const values = [selectedOptionsStr, quizId]

  const query = {
    // give the query a unique name
    text: text,
    rowMode: 'array',
    values: values
  }

  await client
    .query(query) // your query string here
    .then(result => console.log(result)) // your callback here
    .catch(e => console.error(e.stack)) // your callback here
    .then(() => client.end())

  return 'mock'
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

  await client
    .query(query) // your query string here
    .then(result => console.log(result)) // your callback here
    .catch(e => console.error(e.stack)) // your callback here
    .then(() => client.end())
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

export const getQuestData = async quizGroupType => {
  //return questionsData

  console.log('quizGroupType ' + quizGroupType)

  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  const queryGroup = {
    text: 'SELECT "public"."question-groups"."group" FROM "public"."question-groups" WHERE "public"."question-groups"."id" = $1',
    values: [quizGroupType],
    rowMode: 'array'
  }

  var resultQuestionGroup = 'empty'

  try {
    await client.connect()
    var res = await client.query(queryGroup)

    resultQuestionGroup = res.rows[0]
    console.log('qg len' + res.rows.length)
    console.log('res log resultQuestionGroup' + res.rows[0])
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  var splittedStr = resultQuestionGroup.toString().split(',')

  var questionIdsNums = splittedStr.map(s => {
    return Number.parseInt(s)
  })

  console.log('before console console ')

  questionIdsNums.map((n, i) => {
    console.log('n' + n)
  })

  const queryQuestions = {
    text: 'SELECT "public"."question-list"."id","public"."question-list"."Type","public"."question-list"."Question" FROM "public"."question-list" WHERE "public"."question-list"."id" = ANY ($1)',
    values: [questionIdsNums],
    rowMode: 'array'
  }

  var typesQuestions = []
  var types = []
  var questions = []

  try {
    client = new Client({
      user: 'gen_user',
      host: '147.45.227.55',
      database: 'default_db',
      password: 'j6ukvvX(SS0#&5',
      port: 5432
    })

    await client.connect()
    var res = await client.query(queryQuestions)

    for (var i = 0; i < questionIdsNums.length; i++) {
      var id = questionIdsNums[i]

      for (var j = 0; j < res.rows.length; j++) {
        var idtypequestion = res.rows[j]
        var idtypequestionSplittedStr = idtypequestion.toString().split(',')

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

          types.push(idtypequestionSplittedStr1)
          questions.push(idtypequestionSplittedStr2)

          typesQuestions.push(idtypequestionSplittedStr)

          break
        }
      }
    }
  } catch (e) {
    console.error(e.stack)
  } finally {
    client.end()
  }

  const queryAnswers = {
    text: 'SELECT "public"."question-types"."type","public"."question-types"."answer1","public"."question-types"."answer2","public"."question-types"."answer3","public"."question-types"."answer4","public"."question-types"."answer5" FROM "public"."question-types" WHERE "public"."question-types"."id" != 0',
    rowMode: 'array'
  }

  var typeAnswersSplittedStrs = []

  try {
    client = new Client({
      user: 'gen_user',
      host: '147.45.227.55',
      database: 'default_db',
      password: 'j6ukvvX(SS0#&5',
      port: 5432
    })

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

  for (var i = 0; i < types.length; i++) {
    console.log('type' + types)
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

  var quizQuestions = []
  var quiz1Questions = []

  var imgSources = []

  for (var i = 0; i < questionIdsNums.length; i++) {
    console.log('adding quiz question id ' + questionIdsNums[i] + ' num ' + i)

    //console.log('quiz question type ' + types[i])
    //console.log('quiz question text ' + questions[i])
    //console.log('quiz question answers ' + answers[i])

    if (types[i].includes('image')) {
      imgSources = [
        '/images/illustrations/characters/2.png',
        '/images/illustrations/characters/1.png',
        '/images/illustrations/characters/4.png',
        '/images/illustrations/characters/5.png',
        '/images/illustrations/characters/3.png'
      ]
    }

    var quizQuestion = {
      type: types[i],
      subtitle: questions[i],
      answers: answers[i],
      imgSrcs: types[i].includes('image') ? imgSources : undefined
    }

    quiz1Questions.push(quizQuestion)
  }

  quizQuestions.push(quiz1Questions)

  return quizQuestions
}
