'use server'

import { preload, getDashboardData as getUserData, checkIsAvailable } from '@/app/server/dashboardstrategy'

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

const local = 'ru-RU'

import { getMockDashboardData } from '@/app/server/MockData'
import { saveAIAdvice } from './dashboardai'

export const updateCacheData = async () => {
  //parrallel query with all needed data id's
  console.log('company id ' + 1)
  await preload(1)
}

//, getDashboardData as fetchAiData
export const getDashboardData = async id => {
  console.log('getDashboardData  ' + id + ' :dashboarddbcache')

  if (checkIsAvailable(id) == false) {
    console.log('cached not available retun mock id ' + id)
    var mocked = getMockDashboardData(id)

    mocked.currentQuizStarts = mocked.currentQuizStarts.toLocaleDateString(local, options)
    mocked.nextQuizStarts = mocked.nextQuizStarts.toLocaleDateString(local, options)

    return mocked
  } else {
    console.log('available ')
  }

  console.log('getDashboardData from db available id  ' + id)

  return await getUserData(id)
}
