import OpenAI from 'openai'

const axios = require('axios')

const apiKey = process.env.CHATGPT_API_KEY

const client = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY //['OPENAI_API_KEY'] // This is the default and can be omitted
})

//reverse proxy api
async function makeOPENCHATAIGetRequest(message) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo'
  })

  return chatCompletion

  const url = 'https://hroomdeveloper-ai-proxy.hf.space/api/v1/chat/completions'

  let returnResponse = ''

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }

  //gpt-4
  const data = {
    model: 'gpt-3.5-turbo', // Or use 'gpt-3.5-turbo' if you are using GPT-3.5
    messages: [{ role: 'user', content: message }],
    max_tokens: 150
  }

  try {
    let response = await axios.post(url, data, { headers })

    returnResponse = response.data.choices[0].message.content

    console.log('ChatGPT:', returnResponse)
  } catch (error) {
    returnResponse = ''
    console.error('Error communicating with ChatGPT:', error.response ? error.response.data : error.message)
  }

  return returnResponse
}

export default makeOPENCHATAIGetRequest
