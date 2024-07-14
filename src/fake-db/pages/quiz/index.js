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
      subtitle: 'This is an example question 1 from test quiz dots',
      imgSrc: [
        //todo remove this is not used
        '/images/illustrations/characters/1.png',
        '/images/illustrations/characters/2.png',
        '/images/illustrations/characters/3.png',
        '/images/illustrations/characters/4.png',
        '/images/illustrations/characters/5.png'
      ],
      imgHeight: 120,
      answers: ['Answer1', 'Answer2', 'Answer3', 'Answer4', 'Answer5']
    },
    {
      type: QuestionTypes[1],
      subtitle: 'This is an example question 2 from test quiz slider',
      answers: ['1', '2', '3', '4', '5']
    },
    {
      type: QuestionTypes[2],
      subtitle: 'This is an example question 3 from test quiz image',
      answers: ['Not at all', 'Not so much', 'Somewhat', 'Yes absolutely'],
      imgSrcs: [
        '/images/illustrations/characters/3.png',
        '/images/illustrations/characters/9.png',
        '/images/illustrations/characters/14.png',
        '/images/illustrations/characters/16.png'
      ]
    },
    {
      type: QuestionTypes[3],
      subtitle: 'This is an example question 4 from test quiz rate',
      answers: ['', '', '', '']
    },
    {
      type: QuestionTypes[4],
      subtitle: 'This is an example question 5 from test quiz scale',
      answers: ['', '']
    }
  ]
}
