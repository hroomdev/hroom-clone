//import { HttpsProxyAgent } from 'https-proxy-agent'

import OpenAI from 'openai'

// Override per-request:

//const axios = require('axios')

//const apiKey = process.env.CHATGPT_API_KEY

//const client = new OpenAI({
//  apiKey: process.env.CHATGPT_API_KEY // This is the default and can be omitted
//})
//  HttpsProxyAgent: new HttpsProxyAgent('http://168.63.76.32:3128'),
//httpAgent: new HttpsProxyAgent('http://hroomdeveloper-ai-proxy.hf.space:7860'), /// /api/v1' chat/completions

//reverse proxy api
async function makeOPENCHATAIGetRequest(message) {
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

export async function makeOPENCHATAIAPIVectorStoreDELRequest() {
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

export async function makeOPENCHATAIAPIVectorStoreCreateRequest() {
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

export async function makeOPENCHATAIAPIVectorStoreRequest() {
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

  //const rst = await client.createChatCompletion(
  //  {
  //    model: 'gpt-3.5-turbo',
  //    messages: [{ role: 'user', content: message }]
  //  },
  //  {
  //    proxy: false,
  //    httpAgent: HttpsProxyAgent('http://proxy-host:proxy-port'),
  //    httpsAgent: HttpsProxyAgent('http://proxy-host:proxy-port')
  //  }
  //)

  //const url = 'https://hroomdeveloper-ai-proxy.hf.space/api/v1/chat/completions'

  //const urlVS = 'https://hroomdeveloper-ai-proxy.hf.space/api/v1/vector_stores/vs_qIjt5szPOVqtyifTrOLFde1C'
  //
  //let returnResponse = ''
  //
  //const headers = {
  //  'Content-Type': 'application/json',
  //  Authorization: `Bearer ${apiKey}`,
  //  'OpenAI-Beta': 'assistants=v2'
  //}

  //gpt-4
  //const data = {
  // name: 'Surveys.json'
  //}

  //{
  //  model: 'gpt-3.5-turbo', // Or use 'gpt-3.5-turbo' if you are using GPT-3.5
  //  messages: [{ role: 'user', content: message }],
  //  max_tokens: 150,
  //}

  try {
    //let response = await axios.post(url, data, { headers })

    //let response = axios.get(urlVS, data, { headers })

    //let response = await axios.getAdapter(urlVS, data, { headers })
    //returnResponse = response.data.choices[0].message.content
    console.log('respose file counts ' + JSON.stringify(response))

    console.log('ChatGPT:', returnResponse)
  } catch (error) {
    returnResponse = ''
    console.error('Error communicating with ChatGPT:', error.response ? error.response.data : error.message)
  }

  return 'some response' //returnResponse
}

export default makeOPENCHATAIGetRequest
