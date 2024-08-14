'use server'

import { GET } from '@/app/api/apps/dashboard/route'

const local = 'ru-RU'

import { checkIsAvailable, Item, preload, updateCacheData } from '@/app/server/dashboarddbcache'
import { getMockDashboardData } from '@/app/server/MockData'

import { getMaxRespondentsFollowUpArrTextRespPercResp } from '@/app/server/actions'

import { getAIAdvices } from './../../../../../app/server/dashboardai'

import { getStaticProps } from './../../../../../../src/views/pages/dashboards/index'

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

export const Dashboard = async () => {
  console.log('is server ' + (typeof window === 'undefined') + 'Enter Dashboard : page.jsx')

  var data = await getStaticProps()

  updateCacheData()

  var advices = await getAIAdvices('1')

  for (var i = 0; i < advices.length; i++) {
    //console.log('advice readed ' + advices[i])
  }

  var insights = await getAIAdvices('3')

  for (var i = 0; i < insights.length; i++) {
    //console.log('insights readed ' + insights[i])
  }

  console.log('когорты из бд')
  var cohortsJSONstrs = await getAIAdvices(4, 3)

  for (var i = 0; i < cohortsJSONstrs.length; i++) {
    console.log('cohort readed ' + cohortsJSONstrs[i])
  }

  return (
    <DashboardBuilder
      companyId={await companyId()}
      data={data}
      initialAdivces={advices}
      initialInsights={insights}
      initialCohortsJSONstrs={cohortsJSONstrs}
    />
  )
}

export default Dashboard
