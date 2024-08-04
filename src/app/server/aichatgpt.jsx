const axios = require('axios')

const apiKey = process.env.CHATGPT_API_KEY

//reverse proxy api
async function makeOPENCHATAIGetRequest(message) {
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
