const locale = Intl.DateTimeFormat().resolvedOptions().locale
const localeRUsubstr = 'RU'

console.log('locale' + locale)

//RU locale javascript node js react instance reads and passed dates with commas so its difference in parsing and queries values
//between sdifferent node server instances based on locale this db postgresql pg library for nodejs
//behaviour is takes into account here

//layout db public.quiz columns indexes
export const dbQuizIdIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 0 : 0
}

export const dbQuizCreatedAtSIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 1 : 1
}

export const dbQuizTypeIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 3 : 2
}

export const dbQuizTimeStartSIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 4 : 3
}

export const dbQuizAuditoryIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 6 : 4
}

//layout db public.question-groups columns indexes breaks after 3-group using separator ,
export const dbQuizGroupIdIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 0 : 0
}

export const dbQuizGroupCreatedAtSIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 1 : 1
}

export const dbQuizGroupGroupIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 3 : 2
}

export const dbSelectedAnswersIdIdx = async () => {
  return locale.toString().includes(localeRUsubstr) ? 0 : 0
}
