// MUI Imports
import Grid from '@mui/material/Grid'

import DashboardWelcomeCard from '@views/dashboards/dashboard/src/DashboardWelcomeCard'

import { DashboardBuilder } from '@views/dashboards/dashboard/src/screens/DashboardBuilder'

import { GET } from '@/app/api/apps/dashboard/route'

import {
  getDashboardData,
  getCurrentQuizAuditory as currentQuizPassAll,
  getCurrentQuizTimeStart as currentQuizTimeStart,
  getEngageMetrics as getEngageMetrics,
  companyId
} from '@/app/server/dashboardstrategy'

const Dashboard = async () => {
  var dashboardData = await getDashboardData()

  //console.log('db : page ' + JSON.stringify(dashboardData))

  //const filteredData = dashboardData?.filter(companyStats => companyStats.id === companyId)

  //if (!filteredData) {
  //  redirect('/not-found')
  //}

  return dashboardData ? (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DashboardWelcomeCard />
      </Grid>
      <Grid item>
        <DashboardBuilder dashboardData={dashboardData[companyId - 1]} />
      </Grid>
    </Grid>
  ) : null
}

export default Dashboard
