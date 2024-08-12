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

  console.log('list result JSON  ' + JSON.stringify(vectorStoreFilesListResult))

  var FilesIDS = []

  for (var i = 0; i < vectorStoreFilesListResult.data.length; i++) {
    console.log('list result id i ' + i + '   is ' + vectorStoreFilesListResult.data[i].id)
    FilesIDS.push(vectorStoreFilesListResult.data[i].id)
  }

  //delete vector store files

  var deleteFilesFromVectorStoreResults = await DeleteVectorStoreFiles(vectorStoreId, FilesIDS)

  for (var i = 0; i < deleteFilesFromVectorStoreResults.length; i++) {
    console.log(
      'delete files from vector store result for  i ' +
        i +
        '   id is ' +
        deleteFilesFromVectorStoreResults[i].id +
        '  status ' +
        deleteFilesFromVectorStoreResults[i].deleted
    )
  }

  if (FilesIDS.length != deleteFilesFromVectorStoreResults.length) {
    console.error('failed to delete files from vector store all files earlyout : dashboardai.js')

    return 'fail update files reason -  inconsistent vector store delete retry'
  }

  //delete files

  var deleteFilesResults = await DeleteFiles(FilesIDS)

  for (var i = 0; i < deleteFilesResults.length; i++) {
    console.log(
      'delete files result for  i ' +
        i +
        '   id is ' +
        deleteFilesResults[i].id +
        '  status ' +
        deleteFilesResults[i].deleted
    )
  }

  if (FilesIDS.length != deleteFilesResults.length) {
    console.error('failed to delete files all earlyout : dashboardai.js')

    return 'fail update files reason -  inconsistent remove retry'
  }

  //upload files
  var filesAsStrs = [surveysJson, questionsJson, surveys_Statisticsjson, employeesjson]

  var date = new Date()

  var hash =
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDate().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString() +
    date.getMilliseconds().toString()

  console.log('date.getFullYear() ' + date.getFullYear())
  console.log('date.getMonth() ' + date.getMonth())
  console.log('date.getDate() ' + date.getDate())
  console.log(' date.getHours() ' + date.getHours())
  console.log('date.getMinutes() ' + date.getMinutes())
  console.log('date.getSeconds() ' + date.getSeconds())
  console.log('date.getMilliseconds() ' + date.getMilliseconds())

  console.log('hash ' + hash)

  var filesNames = [
    'Surveys' + hash + '.json',
    'Questions' + hash + '.json',
    'Survey_Statistics' + hash + '.json',
    'Employees' + hash + '.json'
  ]

  let uploadFilesResults = await FilesUpload(filesAsStrs, filesNames, 'assistants')

  //createvector store file by attaching files with ids to store
  if (uploadFilesResults.length != filesNames.length) {
    console.error('failed to upload all files earlyout : dashboardai.js')

    return 'fail upload files reason -  inconsistent upload retry'
  }

  let vectorStoreFilesUploadResullts = await CreateVectorStoreFiles(vectorStoreId, uploadFilesResults)

  for (var i = 0; i < vectorStoreFilesUploadResullts.length; i++) {
    console.log('vectorStoreFilesUploadResullts i ' + i + '  status ' + vectorStoreFilesUploadResullts[i].status)
  }

  if (vectorStoreFilesUploadResullts.length != uploadFilesResults.length) {
    console.error('failed to connect files to vector stores earlyout : dashboardai.js')

    return 'fail upload files reason -  inconsistent connect files to vector store retry connect files'
  }

  //let storeCreate = await VectorStoreCREATE()

  //console.log(' store Create ' + storeCreate)

  ////create store with files from theese stringsjsons
  let listResult = await VectorStoreLIST(vectorStoreId)

  //add surveysJson questionsJson surveys_Statisticsjson employeesjson

  //let prompt = 'ping'

  //query ai then save advices
  //

  return listResult
}

export const activateAIAdvice = async (threadId, assistantId) => {
  let resultAddMessageToAThread = await AddMessageToAThread(threadId, promptPrepare0)

  let run = await RunWIthoutStreaming(threadId, assistantId)

  return await new Promise(resolve => {
    const interval = setInterval(async () => {
      if (run.status === 'completed') {
        resolve('run completed')
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
