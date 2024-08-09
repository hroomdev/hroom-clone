import {
  getAIAdvices,
  getAIAdviceFromThread,
  saveAIAdvice,
  updateVectorStore,
  activateAIAdvice
} from './app/server/dashboardai'

import { saveAdvicesTexts } from './app/server/actions.js'
import { getEmployeesJSON, getQuestionsJSON, getStatisticsJSON, getSurveysJSON } from './jsonParser'
import { updateCacheData } from './app/server/dashboarddbcache'

export async function register() {
  console.log('registerstart' + new Date().toString())

  //updateCacheData()

  return

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

  try {
    var employees = await updateVectorStore(surveysJSONStr, questionsJSONStr, statisticJSONStr, employesJSONStr)

    var threadid = 'thread_UEBpIa52VnG5dc77bt8H2HAW'
    var assistantid = 'asst_MUBJtTYH5GqDjiGSTEbOajEp'

    //var rethinkedAdviceRun = await activateAIAdvice(threadid, assistantid) adds prompt message and runs once

    var rethinkedAdviceRun = await getAIAdviceFromThread(threadid) // только взять последнее сообщение из истории

    console.log('rethinkedAdviceRun' + rethinkedAdviceRun)

    var resultWithoutRoleJSON = rethinkedAdviceRun.split('>').pop()

    console.log('ответ не по ролям' + resultWithoutRoleJSON)
  } catch (error) {
    console.log('ошибка обновления векторного хранилища характеристик из бд и получения свежих данных ' + error)
  }

  var result = JSON.parse(resultWithoutRoleJSON)

  var insights = []

  var insightStore = result['insights']

  console.log('insightStore' + JSON.stringify(insightStore))

  var interestingFindingsAssocArr = insightStore['interesting_findings']

  //brute-force all findings one by one from associative array
  var limitAnswers = 10

  for (var i = 1; i < limitAnswers; i++) {
    var key = i.toString()

    if (key in interestingFindingsAssocArr) {
      var ifinding = interestingFindingsAssocArr[i.toString()]

      insights.push(ifinding)

      continue
    }

    break
  }

  console.log('всего сгенерировано ' + insights.length)

  var advices = []
  var advicesStoreAssocArr = result['recommendations']

  for (var i = 1; i < limitAnswers; i++) {
    var key = i.toString()

    if (key in advicesStoreAssocArr) {
      var advice = advicesStoreAssocArr[i.toString()]

      advices.push(advice)

      continue
    }

    break
  }

  console.log(advices.length + ' советов ')

  for (var i = 0; i < insights.length; i++) {
    console.log('инсайт  ' + insights[i] + ' ' + i)
  }

  for (var i = 0; i < advices.length; i++) {
    console.log('совет  ' + advices[i] + ' ' + i)
  }

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
}
