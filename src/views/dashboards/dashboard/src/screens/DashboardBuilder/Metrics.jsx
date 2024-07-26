// bracket notation keys https://stackoverflow.com/questions/8317982/how-can-i-access-a-javascript-object-which-has-spaces-in-the-objects-key

//satisfaction: 'Satisfaction',
//ambassadorship: 'Ambassadorship',
//happiness: 'Happiness',
//relationshipWithManager: 'Relationship with Manager',
//wellness: 'Wellness',
//relationshipWithPeers: 'Relationship with Peers',
//personalGrowth: 'Personal Growth',
//alignment: 'Alignment',
//recognition: 'Recognition',
//feedback: 'Feedback',
//engagement: 'Вовлеченность'

export const metricsru = {
  Satisfaction: 'Удовлетворенность',
  Ambassadorship: 'Лояльность',
  Happiness: 'Счастье',
  'Relationship with Manager': 'Отношения с руководителем',
  Wellness: 'Самочувствие',
  'Relationship with Peers': 'Отношения с коллегами',
  'Personal Growth': 'Личностный рост',
  Alignment: 'Согласованность',
  Recognition: 'Признание',
  Feedback: 'Обратная связь',
  Engagement: 'Вовлеченность',
  Tip: 'Метрика'
}

//compile - time dependent constant last 'Tip' sensitive to change order! andd count

export default metricsru
