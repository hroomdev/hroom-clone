const local = 'ru-RU'

export const getMockDashboardData = id => {
  //set cache renewal conditionscheck is available on each new user data must be set false
  var participantsQuizPassed = 100
  var participantsQuizAll = 1000
  var participationPercent = 10

  var currentQuizStarts = new Date(Date.UTC(2024, 6, 17, 3, 10, 0)) //23 мая 2024
  var curToNow = 'неделю'
  var nowToNext = '13 дней'
  var nextQuizStarts = new Date(Date.UTC(2024, 7, 5, 7, 12, 6)) // 3 июня 2024
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

  for (var i = 0; i < teamsMetricStats.length; i++) {
    for (var j = 0; j < teamsMetricStats[i].length; j++) {
      teamsMetricStats[i][j] = Math.floor(Math.random() * 10)
    }
  }

  for (var i = 0; i < teamsMetricDiffStats.length; i++) {
    for (var j = 0; j < teamsMetricDiffStats[i].length; j++) {
      teamsMetricDiffStats[i][j] = -Math.random() + Math.random()
    }
  }

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

  for (var i = 0; i < 10; i++) {
    var date = new Date(date)

    date.setHours(date.getHours() + i)

    categoriesApexLineMetrics.push(date.toLocaleString(local, optionsChart)) //
  }

  //mock data
  seriesApexLineMetrics = seriesApexLineMetrics.map((item, index) => {
    for (var i = 0; i < transactionsMetricStats.length; i++) {
      transactionsMetricStats[i] = Math.floor(Math.random() * 10)
    }

    for (var i = 0; i < 10; i++) {
      item.data.push(transactionsMetricStats[i])
    }

    return item
  })

  //

  var timeStart = Date.now()

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
    teamsMetricDiffStats: teamsMetricDiffStats
  }

  return db
}
