import { GET } from '@/app/api/apps/dashboard/route'

import { Item, preload, checkIsAvailable } from '@/app/server/dashboardstrategy'

const companyId = 1

const Dashboard = async () => {
  preload(companyId)

  const isAvailable = checkIsAvailable(companyId)

  //console.log('db : page ' + JSON.stringify(dashboardData))

  //const filteredData = dashboardData?.filter(companyStats => companyStats.id === companyId)

  //if (!filteredData) {
  //  redirect('/not-found')
  //}

  return isAvailable ? Item(companyId) : null
}

export default Dashboard
