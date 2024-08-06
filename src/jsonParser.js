import { getEmployees, getQuestionsOrderDesc, getStatistics, getSurveysOrderByIdDesc } from './app/server/actions'

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

  return JSON.stringify(questionsres.rows) //id to survey_id created_at timestart to start_date
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
      //console.log('surveys ' + i + '  field  ' + surveysres.fields[j].name + ' value ' + emp[surveysres.fields[j].name])
    }
  }

  return JSON.stringify(surveysres.rows) //id to survey_id created_at timestart to start_date
}
