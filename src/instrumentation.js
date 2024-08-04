import makeOPENCHATAIGetRequest from './app/server/aichatgpt'
import { getAIAdvices } from './app/server/dashboardai'

export async function register() {
  //load db to cache dashboard

  console.log('register hook start')

  var advices = await getAIAdvices('3')

  for (var i = 0; i < advices.length; i++) {
    console.log('advice readed ' + advices[i])
  }

  console.log('register hook end')
}
