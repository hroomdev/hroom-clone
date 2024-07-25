const locale = Intl.DateTimeFormat().resolvedOptions().locale

console.log('locale' + locale)

//layout db public.quiz columns indexes
export const dbQuizIdIdx = async () => {
  return locale.toString().includes('RU') ? 0 : 0
}

export const dbQuizCreatedAtSIdx = async () => {
  return locale.toString().includes('RU') ? 1 : 1
}

export const dbQuizTypeIdx = async () => {
  return locale.toString().includes('RU') ? 3 : 2
}

export const dbQuizTimeStartSIdx = async () => {
  return locale.toString().includes('RU') ? 4 : 3
}

export const dbQuizAuditoryIdx = async () => {
  return locale.toString().includes('RU') ? 6 : 4
}

//layout db public.question-groups columns indexes breaks after 3-group using separator ,
export const dbQuizGroupIdIdx = async () => {
  return locale.toString().includes('RU') ? 0 : 0
}

export const dbQuizGroupCreatedAtSIdx = async () => {
  return locale.toString().includes('RU') ? 1 : 1
}

export const dbQuizGroupGroupIdx = async () => {
  return locale.toString().includes('RU') ? 3 : 2
}

export const dbSelectedAnswersIdIdx = async () => {
  return locale.toString().includes('RU') ? 0 : 0
}
