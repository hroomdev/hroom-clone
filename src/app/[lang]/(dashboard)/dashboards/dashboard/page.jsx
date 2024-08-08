export const dynamic = 'force-static'

import { GET } from '@/app/api/apps/dashboard/route'

const local = 'ru-RU'

import { Item, preload, checkIsAvailable, updateCacheData } from '@/app/server/dashboarddbcache'
import { getMockDashboardData } from '@/app/server/MockData'

import { getAIAdvices } from './../../../../../app/server/dashboardai'

export const companyId = 1

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

const Dashboard = async () => {
  console.log('Enter Dashboard : page.jsx')

  var data = getMockDashboardData(companyId)

  updateCacheData()

  var advices = await getAIAdvices('1')

  for (var i = 0; i < advices.length; i++) {
    console.log('advice readed ' + advices[i])
  }

  var insights = await getAIAdvices('3')

  for (var i = 0; i < insights.length; i++) {
    console.log('insights readed ' + insights[i])
  }

  if ((await checkIsAvailable(companyId)) == false) {
    console.log('checkIsAvailable(id) == false : page ')

    data.currentQuizStarts = data.currentQuizStarts.toLocaleDateString(local, options)
    data.nextQuizStarts = data.nextQuizStarts.toLocaleDateString(local, options)
  } else {
    console.log('available ')
    data = await Item(companyId)
  }

  return <DashboardBuilder companyId={companyId} data={data} initialAdivces={advices} initialInsights={insights} />
}

export default Dashboard
