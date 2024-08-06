const local = 'ru-RU'
const en = 'en-GB'

export const getMockDashboardData = id => {
  //set cache renewal conditionscheck is available on each new user data must be set false
  var participantsQuizPassed = 100
  var participantsQuizAll = 1000
  var participationPercent = 10

  var currentQuizStarts = new Date(Date.UTC(2024, 6, 17, 3, 10, 0)) //23 мая 2024
  var curToNow = 'неделю'
  var nowToNext = '13 дней'
  var nextQuizStarts = new Date(Date.UTC(2024, 11, 30, 7, 12, 6)) //
  var totalRevenueStats = [
    1.5, // процент изменения с последнего опроса
    21, // статистика тотал по всем метрикам  вовлеченные
    26, // статистика тотал по всем метрикам  слабо
    23, // статистика тотал по всем метрикам  невовлеченные
    30, // статистика тотал по всем метрикам  пропустили
    1.1 //абсолютное значение вовлеченности
  ]

  var transactionsMetricStats = [1.1, 2.2, 3.3, 7.7, 7.8, 7.9, 8.0, 3.3, 5.0, 8.8]
  var transactionsMetricDiffStats = [1.1, 0.5, 1.2, 1.1, 1.8, 0.9, 0.3, 0.8, 1.2, 0.8]

  //row = particular metric for a teams from 0 to 13
  var teamsMetricStory = {
    dateStamp: [],
    stats: []
  }

  var teamsMetricStats = [
    [1.1, 0.5, 0.2, 1.1, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 1.2, 1.1, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 3.1, 6.2, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 6.2, 1.6, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 2.2, 2.3, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 1.3, 3.1, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 2.2, 4.3, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 6.5, 5.1, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 3.2, 6.5, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 2.2, 7.4, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5],
    [1.1, 0.5, 4.2, 8.1, 1.8, 0.9, 0.3, 0.1, 0.2, 1.1, 5.5, 0.1, 1.5]
  ]

  //row = particular metric values for a different teams from 0 to 13
  var teamsMetricDiffStats = [
    [1, 3.5, 5.2, 1.6, 2.8, 3.9, 9.3, 0, 0, 0, 0, 0, 0],
    [8.1, 0.4, 1.2, 5.1, 1.8, 0.9, 1.3, 0, 0, 0, 0, 0, 0],
    [3.1, 6.5, 1.5, 9.1, 1.8, 1.9, 0.2, 0, 0, 0, 0, 0, 0],
    [0.1, 5.5, 1.6, 1.6, 1.8, 3.9, 3.1, 0, 0, 0, 0, 0, 0],
    [1.1, 1.5, 2.2, 6.1, 1.4, 5.9, 0.2, 0, 0, 0, 0, 0, 0],
    [1.1, 2.5, 1.2, 7.2, 1.2, 3.9, 5.4, 0, 0, 0, 0, 0, 0],
    [2.1, 3.5, 3.6, 1.3, 1.8, 2.9, 0.7, 0, 0, 0, 0, 0, 0],
    [3.1, 6.5, 2.3, 2.4, 1.8, 1.9, 4.3, 0, 0, 0, 0, 0, 0],
    [6.1, 4.5, 5.2, 3.5, 1.8, 6.9, 6.3, 0, 0, 0, 0, 0, 0],
    [3.1, 0.5, 1.1, 4.7, 1.8, 7.9, 2.6, 0, 0, 0, 0, 0, 0],
    [2.1, 0.5, 1.0, 2.1, 1.2, 2.9, 0.3, 0, 0, 0, 0, 0, 0]
  ]

  function arr2DRandomizeFloorTo(arr) {
    var shallow = Array(arr.length)

    for (var i = 0; i < shallow.length; i++) {
      shallow[i] = Array(arr[i].length)
    }

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        shallow[i][j] = Math.floor(Math.random() * 10)
      }
    }

    return shallow
  }

  function arr2DrandomizeMinusToPlus(arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        arr[i][j] = -Math.random() + Math.random()
      }
    }
  }

  function arrLength(arr) {
    //console.log('typeof ' + typeof arr + 'arr Length ' + arr.length)
  }

  //console.log('teamsMetricDiffStats ' + teamsMetricStats.length)

  teamsMetricStats = arr2DRandomizeFloorTo(teamsMetricStats)

  //teamsMetricDiffStats = arr2DrandomizeMinusToPlus(teamsMetricDiffStats)

  var teamMetricsDateStart = new Date(Date.UTC(2024, 6, 17, 3, 10, 0))
  var teamMetricsDateEnd = new Date(Date.UTC(2024, 6, 17, 3, 10, 0))

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const optionsChart = {
    //day: 'numeric',
    //hour: 'numeric'
    month: 'short'
  }

  // Vars
  var seriesApexLineMetrics = [
    {
      data: [] //5.5, 1.0, 4.5
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    },
    {
      data: []
    }
  ]

  var categoriesApexLineMetrics = [] //'7/12', '8/12', '9/12'

  var toGenerateQuizCount = 10

  for (var i = 0; i < toGenerateQuizCount; i++) {
    var artificialDate = new Date()

    if (i < 1) {
      artificialDate.setMinutes(artificialDate.getMinutes() - i)
    } else if (i < 2) {
      artificialDate.setHours(artificialDate.getHours() - i)
    } else if (i < 4) {
      artificialDate.setDate(artificialDate.getDate() - i)
    } else if (i < 5) {
      artificialDate.setMonth(artificialDate.getMonth() - i)
    } else artificialDate.setFullYear(artificialDate.getFullYear() - i)

    //artificialDate.setHours(artificialDate.getHours() + i)

    //var artificialDateLocal =  //optionsChart

    categoriesApexLineMetrics.push(artificialDate.toLocaleString(optionsChart))
    teamsMetricStory.dateStamp.push(artificialDate)

    //console.log('team metric stats ' + JSON.stringify(teamsMetricStats))
    var rndMetricStats = arr2DRandomizeFloorTo(teamsMetricStats)

    //console.log('team metric stats after randommize' + JSON.stringify(rndMetricStats))

    //teamsMetricDiffStats = arr2DrandomizeMinusToPlus(teamsMetricDiffStats)

    teamsMetricStory.stats.push(rndMetricStats)

    //console.log('stats json ' + JSON.stringify(teamsMetricStory.stats))
  }

  //mock data
  seriesApexLineMetrics = seriesApexLineMetrics.map((item, index) => {
    for (var i = 0; i < transactionsMetricStats.length; i++) {
      transactionsMetricStats[i] = Math.floor(Math.random() * 10)
    }

    for (var i = 0; i < toGenerateQuizCount; i++) {
      item.data.push(transactionsMetricStats[i])
    }

    return item
  })

  //

  var timeStart = Date.now()

  var acutelys = [
    {
      data: [45, 5, 15, 15, 5],
      question: 'Моя организация поддержит меня, если мне понадобится использовать гибкий график работы',
      submetric: 'Баланс работа-жизнь',
      metric: 'Счастье'
    },
    {
      data: [5, 55, 5, 5, 15],
      question: 'Я получаю значимое признание.',
      submetric: 'Баланс работа-жизнь',
      metric: 'Счастье'
    },
    {
      data: [15, 5, 45, 15, 5],
      question:
        'Что из следующего лучше всего описывает количество отзывов, которые вы обычно получаете о своей работе?',
      submetric: 'Баланс работа-жизнь',
      metric: 'Счастье'
    },
    {
      data: [15, 5, 15, 45, 5],
      question: 'Вкладывает ли ваша организация столько ресурсов, людей и усилий, сколько соответствует ее амбициям?',
      submetric: 'Баланс работа-жизнь',
      metric: 'Счастье'
    },
    {
      data: [15, 5, 15, 15, 45],
      question: 'Моя организация ценит уникальность членов своей команды.',
      submetric: 'Баланс работа-жизнь',
      metric: 'Счастье'
    }
  ]

  var db = {
    id: id,
    participationPercent: participationPercent,
    participantsQuizPassed: participantsQuizPassed,
    participantsQuizAll: participantsQuizAll,

    currentQuizStarts: currentQuizStarts,
    curToNow: curToNow,
    nowToNext: nowToNext,
    nextQuizStarts: nextQuizStarts,
    totalRevenueStats: totalRevenueStats, //[],
    transactionsMetricStats: transactionsMetricStats, //[]
    transactionsMetricDiffStats: transactionsMetricDiffStats, //[]
    seriesApexLineMetrics: seriesApexLineMetrics, //[]
    categoriesApexLineMetrics: categoriesApexLineMetrics, //[]
    teamsMetricStats: teamsMetricStats,
    teamsMetricDiffStats: teamsMetricDiffStats,
    acutelys: acutelys,
    teamsMetricStory: teamsMetricStory
  }

  return db
}
