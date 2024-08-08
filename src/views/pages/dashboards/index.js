'use server'

import { GET } from '@/app/api/apps/dashboard/route'

const local = 'ru-RU'

import { Item, preload, checkIsAvailable, updateCacheData } from '@/app/server/dashboarddbcache'
import { getMockDashboardData } from '@/app/server/MockData'

export const companyId = async () => {
  return 1
}

import { DashboardBuilder } from '@/views/dashboards/dashboard/src/screens/DashboardBuilder/DashboardBuilder'

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

export async function getStaticProps() {
  console.log(' is server  ' + (typeof window === 'undefined') + ' :index.js')

  var data = getMockDashboardData(await companyId())

  if ((await checkIsAvailable(await companyId())) == false) {
    console.log('checkIsAvailable(id) == false : page ')

    data.currentQuizStarts = data.currentQuizStarts.toLocaleDateString(local, options)
    data.nextQuizStarts = data.nextQuizStarts.toLocaleDateString(local, options)
  } else {
    console.log('available ')
    data = await Item(await companyId())
  }

  return data
}
