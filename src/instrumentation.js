import { getAIAdvices, saveAIAdvice } from './app/server/dashboardai'

import { updateCacheData } from './app/server/dashboarddbcache'

//import { saveAIAdvice } from './app/server/'

export async function register() {
  //load db to cache dashboard
  console.log('register hook start')

  //var advice = await saveAIAdvice('3', '0')

  //console.log('register hook end' + advice)

  await updateCacheData()

  var advices = await getAIAdvices('3')

  for (var i = 0; i < advices.length; i++) {
    console.log('advice readed ' + advices[i])
  }
}
