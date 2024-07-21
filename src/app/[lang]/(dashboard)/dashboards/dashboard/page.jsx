// MUI Imports
import Grid from '@mui/material/Grid'

import DashboardWelcomeCard from '@views/dashboards/dashboard/src/DashboardWelcomeCard'

import { DashboardBuilder } from '@views/dashboards/dashboard/src/screens/DashboardBuilder'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DashboardWelcomeCard />
      </Grid>
      <Grid item>
        <DashboardBuilder />
      </Grid>
    </Grid>
  )
}

export default Dashboard
