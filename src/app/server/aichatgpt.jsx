//import { HttpsProxyAgent } from 'https-proxy-agent'

import OpenAI from 'openai'

const Readable = require('stream').Readable

// Override per-request:

//const axios = require('axios')

//const apiKey = process.env.CHATGPT_API_KEY

//const client = new OpenAI({
//  apiKey: process.env.CHATGPT_API_KEY // This is the default and can be omitted
//})
//  HttpsProxyAgent: new HttpsProxyAgent('http://168.63.76.32:3128'),
//httpAgent: new HttpsProxyAgent('http://hroomdeveloper-ai-proxy.hf.space:7860'), /// /api/v1' chat/completions

//reverse proxy api
async function CHAT(message) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY // This is the default and can be omitted
  })

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo-0125'
  })

  console.log(completion.choices[0])

  return completion.choices[0].message
}

export async function VectorStoreDEL() {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  const deletedVectorStoreFile = await openai.beta.vectorStores.del('vs_qIjt5szPOVqtyifTrOLFde1C')

  console.log(deletedVectorStoreFile)

  //const myVectorStoreFileBatch = await openai.beta.vectorStores.fileBatches.create('vs_qIjt5szPOVqtyifTrOLFde1C', {
  //  file_ids: ['Surveys.json']
  //})

  //console.log(myVectorStoreFileBatch);

  return deletedVectorStoreFile
}

//Use "assistants" for Assistants and Message files, "vision" for Assistants image file inputs, "batch" for Batch API, and "fine-tune" for Fine-tuning.
export async function FilesUpload(filesAsStrsArr, filesNamesArr, purpose) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  console.log(' files upload ' + JSON.stringify(filesAsStrsArr))
  console.log(' files names ' + JSON.stringify(filesNamesArr))

  const resultsUpload = []

  try {
    for (var i = 0; i < filesAsStrsArr.length; i++) {
      var blob = new Blob([filesAsStrsArr[i]], { type: 'text/plain' })
      var file = new File([blob], filesNamesArr[i], { type: 'text/plain' })

      console.log('trying to upload ' + filesNamesArr[i])

      var curUploadResult = await openai.files.create({
        file: file,
        purpose: purpose
      })

      resultsUpload.push(curUploadResult)

      console.log('result file' + filesNamesArr[i] + ' upload  ' + resultsUpload)
    }
  } catch (error) {
    console.log(error)
  }

  return resultsUpload
}

export async function CreateVectorStoreFiles(vectorStoreId, uploadResultsArr) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  const vectorStoreFilesUploadResullt = []

  try {
    for (var i = 0; i < uploadResultsArr.length; i++) {
      var id = uploadResultsArr[i].id

      console.log('trying to connect file id' + id + ' to a vector store id ' + vectorStoreId)

      //id vector store id files
      const myVectorStoreFile = await openai.beta.vectorStores.files.create(vectorStoreId, {
        file_id: id
      })

      console.log(
        'file id ' +
          id +
          ' connect to vector store id ' +
          vectorStoreId +
          ' result ' +
          JSON.stringify(myVectorStoreFile)
      )

      vectorStoreFilesUploadResullt.push(myVectorStoreFile)
    }
  } catch (error) {
    console.log(error)
  }

  return vectorStoreFilesUploadResullt
}

export async function ListVectorStoreFiles(vectorStoreId) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  var vectorStoreFilesListResult = ''

  try {
    console.log('trying to list vector store id' + vectorStoreId + 'files ')

    //id vector store id files
    vectorStoreFilesListResult = await openai.beta.vectorStores.files.list(vectorStoreId)
  } catch (error) {
    console.log(error)
  }

  return vectorStoreFilesListResult
}

export async function DeleteVectorStoreFiles(vectorStoreId, files_ids) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  var deleteVectorStoreFilesResults = []

  try {
    for (var i = 0; i < files_ids.length; i++) {
      console.log(
        'trying to delete vector store file file id' + files_ids[i] + ' from a vector store id ' + vectorStoreId
      )

      const deletedVectorStoreFileResult = await openai.beta.vectorStores.files.del(vectorStoreId, files_ids[i])

      deleteVectorStoreFilesResults.push(deletedVectorStoreFileResult)
    }
  } catch (error) {
    console.log(error)
  }

  return deleteVectorStoreFilesResults
}

export async function DeleteFiles(files_ids) {
  console.log('DeleteFiles enter file_ids.length ' + files_ids.length)

  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  var deleteFilesResults = []

  try {
    for (var i = 0; i < files_ids.length; i++) {
      console.log('trying to delete  file id' + files_ids[i])
      const fileDeleteResult = await openai.files.del(files_ids[i])

      deleteFilesResults.push(fileDeleteResult)
    }
  } catch (error) {
    console.log(error)
  }

  return deleteFilesResults
}

export async function VectorStoreCREATE() {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  const createVectorStoreResult = await openai.beta.vectorStores.create({
    name: 'Vector store for hroom',
    file_ids: ['file_1', 'file_2', 'file_3', 'file_4']
  })

  console.log(createVectorStoreResult)

  //const myVectorStoreFileBatch = await openai.beta.vectorStores.fileBatches.create('vs_qIjt5szPOVqtyifTrOLFde1C', {
  //  file_ids: ['Surveys.json']
  //})

  //console.log(myVectorStoreFileBatch);

  return createVectorStoreResult
}

export async function VectorStoreLIST() {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  //    project: 'hroom'
  //console.log(completion.choices[0])

  //const vectorStores = await openai.beta.vectorStores.list()

  //console.log(vectorStores)

  //const vectorStore = await openai.beta.vectorStores.update('vs_qIjt5szPOVqtyifTrOLFde1C', {
  //  name: 'Surveys.json'
  //})

  //const vectorStoreFiles = await openai.beta.vectorStores.files.list('vs_qIjt5szPOVqtyifTrOLFde1C')

  const vectorStores = await openai.beta.vectorStores.list()

  console.log(vectorStores)

  console.log('json ' + JSON.stringify(vectorStores))

  console.log('json data' + JSON.stringify(vectorStores.data))

  for (var i = 0; i < vectorStores.data.length; i++) {
    var jsonDatai = vectorStores.data[i]

    console.log(i + 'json data i ' + JSON.stringify(jsonDatai))
  }

  return vectorStores
}

export async function AddMessageToAThread(threadId, prompt) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  const resultCreateMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: prompt
  })

  return resultCreateMessage
}

export async function RunWIthoutStreaming(threadId, assistantId) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  let run = await openai.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: assistantId,
    instructions: ''
  })

  return run
}

export async function GetLastMessageFromAThread(thread_id) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT_API_KEY, // This is the default and can be omitted,
    organization: 'hroom'
  })

  const messages = await openai.beta.threads.messages.list(thread_id)

  const message = messages.data[0] //.reverse() message.content.length - 1

  console.log(`${message.role} > ${message.content[message.content.length - 1].text.value}`)

  return message.content[message.content.length - 1].text.value
}

export default CHAT
