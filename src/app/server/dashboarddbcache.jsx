import { getDashboardData as fetchUserData } from '@/app/server/dashboardstrategy'

//, getDashboardData as fetchAiData
export const getDashboardData = async id => {
  return await fetchUserData(id)
}
