export const dynamic = 'force-static'

import { GET } from '@/app/api/apps/dashboard/route'

const local = 'ru-RU'

import { Item, preload, checkIsAvailable, getDashboardData } from '@/app/server/dashboardstrategy'

export const companyId = 1

import { getMockDashboardData } from '@/app/server/MockData'

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

  //preload(companyId)

  //console.log('db : page ' + JSON.stringify(dashboardData))

  //const filteredData = dashboardData?.filter(companyStats => companyStats.id === companyId)

  //if (!filteredData) {
  //  redirect('/not-found')
  //}
  // return <p>page.jsx return p</p>

  return <DashboardBuilder />
}

export default Dashboard
