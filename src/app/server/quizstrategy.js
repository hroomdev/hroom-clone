import { getCurrentQuizIdAudi } from './dashboardstrategy'

export const createQuiz = async (timeStart, type, auditory) => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  await client.connect()

  const text = 'INSERT INTO "public"."quiz" ("timestart","type","auditory") VALUES($1, $2, $3) RETURNING *'
  const values = [timeStart, type, auditory]

  const query = {
    // give the query a unique name
    text: text,
    rowMode: 'array',
    values: values
  }

  var res = ''

  await client
    .query(query) // your query string here
    .then(result => {
      res = result.rows[0]
    }) // your callback here
    .catch(e => console.error(e.stack)) // your callback here
    .then(() => client.end())

  return res
}

export const createSelectedAnswersCurrentQuiz = async selectedOptionsStr => {
  let client = new Client({
    user: 'gen_user',
    host: '147.45.227.55',
    database: 'default_db',
    password: 'j6ukvvX(SS0#&5',
    port: 5432
  })

  let currentQuizIdAudi = await getCurrentQuizIdAudi()

  let currentQuizId = currentQuizIdAudi[0]
  let currentQuizAudi = currentQuizIdAudi[1]

  await client.connect()
  const text = 'INSERT INTO "public"."selectedAnswers" ("selectedOptions","quizId") VALUES($1, $2) RETURNING *'

  const values = [selectedOptionsStr, currentQuizId]

  const query = {
    // give the query a unique name
    text: text,
    rowMode: 'array',
    values: values
  }

  var r = ''

  await client
    .query(query) // your query string here
    .then(result => {
      r = result.rows[0]
      console.log(result)
    }) // your callback here
    .catch(e => console.error(e.stack)) // your callback here
    .then(() => client.end())

  return r
}
