//modified from source https://gist.github.com/miguelmota/7905510
//original commentary : Returns an array of dates between the two dates

function generateDates(startDate, endDate, maximum) {
  const dates = []
  var counter = 0
  let currentDate = startDate

  const addDays = function (days) {
    const date = new Date(this.valueOf())

    date.setDate(date.getDate() + days)

    return date
  }

  while (currentDate <= endDate && counter < maximum) {
    dates.push(currentDate)
    counter++
    currentDate = addDays.call(currentDate, 1)
  }

  return dates
}

export default generateDates
