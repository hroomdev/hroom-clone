// Next Imports
import { NextResponse } from 'next/server'

import { Item, preload, checkIsAvailable } from '@/app/server/dashboardstrategy'

const companyId = 1

export async function GET() {
  preload(companyId)

  const isAvailable = checkIsAvailable(companyId)

  //console.log('db : page ' + JSON.stringify(dashboardData))

  //const filteredData = dashboardData?.filter(companyStats => companyStats.id === companyId)

  //if (!filteredData) {
  //  redirect('/not-found')
  //}
  var db = isAvailable ? Item(companyId) : null

  //return isAvailable ? Item(companyId) : null

  return NextResponse.json(db)
}
