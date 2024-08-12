import { getAdvicesTexts } from './actions'

import {
  AddMessageToAThread,
  CHAT,
  CreateVectorStoreFiles,
  DeleteFiles,
  DeleteVectorStoreFiles,
  FilesUpload,
  GetLastMessageFromAThread,
  ListVectorStoreFiles,
  ListVectorStoreFilesAxios,
  RunWIthoutStreaming,
  VectorStoreCREATE,
  VectorStoreDEL,
  VectorStoreLIST
} from './aichatgpt'

const promptPrepare0 =
  'Отвечай как профессионал по вовлеченности сотрудников компаний и профессионал в сфере бизнес-консалтинга. Проанализируй данные по вовлеченности сотрудников и дай ответ в двух видах: 1. Инсайты по компании в виде интересных зависимостей между переменными. 2. Советы от ИИ по конкретным найденным проблемам, четкие и ясные, около 200 символов. Три инсайта. Три совета. Результат представь в виде JSON. Не пиши вступительных слов или чего-либо еще, кроме самого ответа.'

export const updateVectorStore = async (surveysJson, questionsJson, surveys_Statisticsjson, employeesjson) => {
  //retrieve and acquire list vector store files array

  var vectorStoreId = 'vs_qIjt5szPOVqtyifTrOLFde1C'

  const vectorStoreFilesListResult = await ListVectorStoreFiles(vectorStoreId)

  //const vectorStoreFilesListResult = await ListVectorStoreFilesAxios(vectorStoreId)no use timeout error with reverse proxy

  console.log('list result JSON  ' + JSON.stringify(vectorStoreFilesListResult))
}

export const activateAIAdvice = async (threadId, assistantId) => {
  let resultAddMessageToAThread = await AddMessageToAThread(threadId, promptPrepare0)

  let run = await RunWIthoutStreaming(threadId, assistantId)

  return await new Promise(resolve => {
    const interval = setInterval(async () => {
      if (run.status === 'completed') {
        resolve('run status = completed') //moved to .then await GetLastMessageFromAThread(run.thread_id)
        clearInterval(interval)
      }
    }, 5000)
  })
}

export const getAIAdviceFromThread = async threadId => {
  let lastMessageFromAThread = await GetLastMessageFromAThread(threadId)

  console.log('lastMessageFromAThread' + lastMessageFromAThread)

  return lastMessageFromAThread
}

export const saveAIAdvice = async prompt => {
  //let prompt = 'ping'

  //query ai then save advices

  let b = await CHAT(prompt)

  console.log(b)

  return b
}

export const getAIAdvices = async (category, limit) => {
  if (category == undefined) {
    var errmsg = 'undefined category  get ai advice   set category first '

    console.logerror(errmsg)

    return [errmsg, errmsg, errmsg]
  }

  //read advices
  var advices = await getAdvicesTexts(category, limit)

  return advices
}
