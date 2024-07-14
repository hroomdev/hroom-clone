const QuestionTypes = {
  0: 'dots',
  1: 'slider',
  2: 'image',
  3: 'rate',
  4: 'scale'
}

export const db = {
  quiz1questions: [
    {
      type: QuestionTypes[0],
      subtitle: 'dots5 question type dots with 5 answers?',
      answers: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']
    },
    {
      type: QuestionTypes[1],
      subtitle: 'slider10-1 question 2 from test quiz slider',
      answers: ['Very bad', 'Very good']
    },
    {
      type: QuestionTypes[1],
      subtitle: 'slider10-2 question 3 from test quiz slider',
      answers: ['Very bad', 'Very good']
    },
    {
      type: QuestionTypes[1],
      subtitle: 'slider10-3 question 4 from test quiz slider',
      answers: ['Very bad', 'Very good']
    },
    {
      type: QuestionTypes[1],
      subtitle: 'slider10-4 question 5 from test quiz slider',
      answers: ['Very bad', 'Very good']
    },
    {
      type: QuestionTypes[2],
      subtitle: 'image-healthy-lifestyle 6 from test quiz image',
      answers: ['Not at all', 'Not so much', 'Somewhat', 'Yes absolutely'],
      imgSrcs: [
        '/images/illustrations/characters/3.png',
        '/images/illustrations/characters/9.png',
        '/images/illustrations/characters/14.png',
        '/images/illustrations/characters/16.png'
      ]
    },
    {
      type: QuestionTypes[2],
      subtitle: 'image-feedback question 7 from test quiz image',
      answers: ['goals miss', 'goals low', 'goals ok', 'golas in red dot'],
      imgSrcs: [
        '/images/illustrations/characters/2.png',
        '/images/illustrations/characters/1.png',
        '/images/illustrations/characters/4.png',
        '/images/illustrations/characters/5.png'
      ]
    },
    {
      type: QuestionTypes[2],
      subtitle: 'image-collab question 8 from test quiz image',
      answers: ['image-collab1', 'image-collab2', 'image-collab3', 'image-collab4'],
      imgSrcs: [
        '/images/illustrations/characters/6.png',
        '/images/illustrations/characters/10.png',
        '/images/illustrations/characters/7.png',
        '/images/illustrations/characters/8.png'
      ]
    },
    {
      type: QuestionTypes[2],
      subtitle: 'image-lifebalance question 9 from test quiz image',
      answers: ['image-lifebalance1', 'image-lifebalance2', 'image-lifebalance3', 'image-lifebalance4'],
      imgSrcs: [
        '/images/illustrations/characters/11.png',
        '/images/illustrations/characters/12.png',
        '/images/illustrations/characters/15.png',
        '/images/illustrations/characters/15.png'
      ]
    },
    {
      type: QuestionTypes[4],
      subtitle: 'scale10 question 10 from test quiz scale',
      answers: ['', '']
    },
    {
      type: QuestionTypes[3],
      subtitle: 'stars5 question 11 from test quiz rate',
      answers: ['', '', '', '']
    }
  ]
}
