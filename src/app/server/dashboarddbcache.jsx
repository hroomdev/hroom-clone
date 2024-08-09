'use server'

import { getDashboardData as getUserData } from '@/app/server/dashboardstrategy'

export const updateCacheData = async () => {
  //parrallel query with all needed data id's
  console.log('company id ' + 1)

  var res = await preload(1)
  resultAllIds[1] = res
  console.log('updateCacheData ') //+ JSON.stringify(db)
}

export async function preload(id) {
  console.log(
    'is server ITEM:dashboarddbcache.jsx' + (typeof window === 'undefined') + 'preload id : getDashboardData... '
  )

  var userData = await getUserData(id)

  return userData
}

export const Item = async id => {
  console.log('is server ITEM:dashboarddbcache.jsx' + (typeof window === 'undefined'))
  return resultAllIds[id]
}

const resultAllIds = []

export const checkIsAvailable = async id => {
  console.log('is server checkIsAvailable:dashboarddbcache.jsx' + (typeof window === 'undefined'))

  var isAvailable = resultAllIds[id] != null && resultAllIds[id] != undefined && resultAllIds.length >= id - 1
  return isAvailable
}
