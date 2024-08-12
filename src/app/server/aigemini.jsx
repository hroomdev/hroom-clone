//const axios = require('axios')

const googleApiKey = process.env.GOOGLEGEMINI_API_KEY

async function makeGOOGLEGEMINIGetRequest(message) {
  const url = 'https://workers-playground-rapid-silence-e188.hroomdeveloper.workers.dev/v1/chat/completions'

  let returnResponse = ''

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${googleApiKey}`
  }

  const data = {
    model: 'gpt-3.5-turbo', // Or use 'gpt-3.5-turbo' if you are using GPT-3.5
    messages: [{ role: 'user', content: message }],
    max_tokens: 150
  }

  try {
    //let response = await axios.post(url, data, { headers })
    //returnResponse = response.data.choices[0].message.content
    //console.log('Google gemini:', returnResponse)
  } catch (error) {
    //returnResponse = ''
    //console.error('Error communicating with Google Gemini:', error.response ? error.response.data : error.message)
  }

  return returnResponse
}

export default makeGOOGLEGEMINIGetRequest
