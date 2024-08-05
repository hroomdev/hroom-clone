export const dynamic = 'force-static'

import { GET } from '@/app/api/apps/dashboard/route'

const local = 'ru-RU'

import { Item, preload, checkIsAvailable, updateCacheData } from '@/app/server/dashboarddbcache'
import { getMockDashboardData } from '@/app/server/MockData'

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

  var promise = await updateCacheData()

  var data = getMockDashboardData(companyId)

  if (checkIsAvailable(companyId) == false) {
    console.log('checkIsAvailable(id) == false : DaSHBOARDbUILDER ')

    data.currentQuizStarts = data.currentQuizStarts.toLocaleDateString(local, options)
    data.nextQuizStarts = data.nextQuizStarts.toLocaleDateString(local, options)
  } else {
    console.log('available ')
    data = Item(companyId)
  }

  return <DashboardBuilder companyId={companyId} data={data} />
}

export default Dashboard
