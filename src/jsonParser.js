import {
  getAllSelectedOptions,
  getEmployees,
  getQuestionsOrderDesc,
  getStatistics,
  getSurveysOrderByIdDesc
} from './app/server/actions'

export const getEmployeesJSON = async () => {
  var maxEmps = 10

  var employeesres = await getEmployees(maxEmps)

  return JSON.stringify(employeesres.rows)
}

export const getQuestionsJSON = async () => {
  var maxQuestions = 120

  var questionsres = await getQuestionsOrderDesc(maxQuestions)

  for (var i = 0; i < questionsres.rows.length; i++) {
    var emp = questionsres.rows[i]

    for (var j = 0; j < questionsres.fields.length; j++) {
      if (questionsres.fields[j].name == 'id') {
        emp['question_id'] = emp['id']

        delete emp['id']
      }

      if (questionsres.fields[j].name == 'Question') {
        emp['question_text'] = emp['Question']

        delete emp['Question']
      }

      if (questionsres.fields[j].name == 'created_at' || questionsres.fields[j].name == 'Type') {
        delete emp[questionsres.fields[j].name]
      }
    }
  }

  return JSON.stringify(questionsres.rows)
}

export const getSelectedAnswersJSON = async () => {
  var maxQuestions = 120

  var answersres = await getAllSelectedOptions()

  console.log('answersres' + answersres)

  for (var i = 0; i < answersres.rows.length; i++) {
    var answer = answersres.rows[i]

    for (var j = 0; j < answersres.fields.length; j++) {
      if (answersres.fields[j].name == 'id') {
        answer['question_id'] = answer['id']

        delete answer['id']
      }

      if (answersres.fields[j].name == 'Question') {
        answer['question_text'] = answer['Question']

        delete answer['Question']
      }

      if (answersres.fields[j].name == 'created_at' || answersres.fields[j].name == 'id') {
        delete answer[answersres.fields[j].name]
      }
    }
  }

  return JSON.stringify(answersres.rows)
}

export const getAnswersJSON = async () => {
  var maxQuestions = 120

  var questionsres = await getQuestionsOrderDesc(maxQuestions)

  for (var i = 0; i < questionsres.rows.length; i++) {
    var emp = questionsres.rows[i]

    for (var j = 0; j < questionsres.fields.length; j++) {
      if (questionsres.fields[j].name == 'id') {
        emp['question_id'] = emp['id']

        delete emp['id']
      }

      if (questionsres.fields[j].name == 'Question') {
        emp['question_text'] = emp['Question']

        delete emp['Question']
      }

      if (questionsres.fields[j].name == 'created_at' || questionsres.fields[j].name == 'Type') {
        delete emp[questionsres.fields[j].name]
      }
    }
  }

  return JSON.stringify(questionsres.rows)
}

export const getStatisticsJSON = async () => {
  var maxStatistics = 10

  var statisticssres = await getStatistics(maxStatistics)

  return JSON.stringify(statisticssres.rows)
}

export const getSurveysJSON = async () => {
  var maxSurveys = 10

  var surveysres = await getSurveysOrderByIdDesc(maxSurveys)

  for (var i = 0; i < surveysres.rows.length; i++) {
    var emp = surveysres.rows[i]

    for (var j = 0; j < surveysres.fields.length; j++) {
      if (surveysres.fields[j].name == 'id') {
        emp['survey_id'] = emp['id']

        delete emp['id']
      }

      if (surveysres.fields[j].name == 'timestart') {
        emp['start_date'] = emp['timestart']

        delete emp['timestart']
      }

      if (
        surveysres.fields[j].name == 'created_at' ||
        surveysres.fields[j].name == 'type' ||
        surveysres.fields[j].name == 'auditory'
      ) {
        delete emp[surveysres.fields[j].name]
      }
    }
  }

  return JSON.stringify(surveysres.rows)
}
