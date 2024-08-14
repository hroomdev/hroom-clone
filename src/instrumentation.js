import {
  activateAIAdvice,
  getAIAdviceFromThread,
  getAIAdvices,
  saveAIAdvice,
  updateVectorStore
} from './app/server/dashboardai'

import { saveAdvicesTexts } from './app/server/actions.js'
import { updateCacheData } from './app/server/dashboarddbcache'
import {
  getEmployeesJSON,
  getQuestionsJSON,
  getSelectedAnswersJSON,
  getStatisticsJSON,
  getSurveysJSON
} from './jsonParser'

export async function register() {
  console.log('registerstart' + new Date().toString())

  updateCacheData()

  //load db to cache dashboard
  console.log('register hook start')

  //prepeq 1 manual calculate/update statistics table -> auto after quiz ends save to db with each quiz ends triggered

  //2 update vector store openchat gpt ai api with jsons
  var employesJSONStr = await getEmployeesJSON()

  console.log('employesJSONStr ' + employesJSONStr)

  var statisticJSONStr = await getStatisticsJSON()

  console.log('statisticJSONStr ' + statisticJSONStr)

  var surveysJSONStr = await getSurveysJSON()

  console.log('surveysJSONStr ' + surveysJSONStr)

  var questionsJSONStr = await getQuestionsJSON()

  console.log('questionsJSONStr ' + questionsJSONStr)

  var selectedAnswersJSONStr = await getSelectedAnswersJSON()

  console.log('selectedAnswersJsonStr ' + selectedAnswersJSONStr)

  try {
    var employees = await updateVectorStore(
      surveysJSONStr,
      questionsJSONStr,
      statisticJSONStr,
      employesJSONStr,
      selectedAnswersJSONStr
    )

    var threadid = 'thread_RCpXzhcJXh0W6D4FbpZXKgm7' // new 'thread_UEBpIa52VnG5dc77bt8H2HAW'
    var assistantid = 'asst_MUBJtTYH5GqDjiGSTEbOajEp'

    var rethinkedAdviceRun = await activateAIAdvice(threadid, assistantid) // adds prompt message and runs once

    var rethinkedAdviceRun = await getAIAdviceFromThread(threadid) // только взять последнее сообщение из истории

    console.log('rethinkedAdviceRun' + rethinkedAdviceRun)

    var resultWithoutRoleJSON = rethinkedAdviceRun.split('>').pop()

    console.log('ответ не по ролям' + resultWithoutRoleJSON)
  } catch (error) {
    console.log('ошибка обновления векторного хранилища характеристик из бд и получения свежих данных ' + error)
  }

  var result = JSON.parse(resultWithoutRoleJSON)

  var insights = result.insights
  var cohort = result.top_cohorts_percentage_text
  var advices = result.advice_from_AI

  console.log(cohort.length + ' cohort ')

  for (var i = 0; i < insights.length; i++) {
    console.log('инсайт  ' + insights[i] + ' ' + i)
  }

  for (var i = 0; i < cohort.length; i++) {
    console.log('когорт  ' + cohort[i] + ' ' + i)
  }

  for (var i = 0; i < advices.length; i++) {
    console.log('совет  ' + advices[i] + ' ' + i)
  }

  var savedCohortsResultRows = await saveAdvicesTexts(4, cohort)

  console.log('save cohort rows ' + JSON.stringify(savedCohortsResultRows))

  var savedInsightsResultRows = await saveAdvicesTexts(3, insights)

  console.log('savedInsightsResultRows ' + JSON.stringify(savedInsightsResultRows))

  var savedReco = await saveAdvicesTexts(1, advices)

  console.log('savedReco ' + JSON.stringify(savedReco))

  var advicesFromDB = await getAIAdvices(1, 3)

  console.log('советы из бд')
  advicesFromDB.map(i => console.log(i))

  var insightsFromDB = await getAIAdvices(3, 3)

  console.log('инсайты из бд')
  insightsFromDB.map(i => console.log(i))

  console.log('когорты из бд')
  var cohortsFromDB = await getAIAdvices(4, 3)
  cohortsFromDB.map(i => console.log(i))
}
