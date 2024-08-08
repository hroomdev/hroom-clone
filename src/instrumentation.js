import { getAIAdvices, saveAIAdvice, updateVectorStore } from './app/server/dashboardai'
import { getEmployeesJSON, getQuestionsJSON, getStatisticsJSON, getSurveysJSON } from './jsonParser'
import { updateCacheData } from './app/server/dashboarddbcache'

export async function register() {
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

  var employees = await updateVectorStore(surveysJSONStr, questionsJSONStr, statisticJSONStr, employesJSONStr)

  //3 get advice from ai query api openchatgpt manual auto trigger after quiz ends for all auditory or manuall triggered
  //4 save advice in db auto

  //var advice2 = await saveAIAdvice(promt2)

  //var advice3 = await saveAIAdvice(promt3)

  //var advice4 = await saveAIAdvice(promt4)

  //var advice4 = await saveAIAdvice('ping this vpn infrastructure test *')

  //console.log('register hook end' + advice4)

  //await updateCacheData()
}
