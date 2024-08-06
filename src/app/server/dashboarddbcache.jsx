'use server'

//import React, { useCallback, cache } from 'react'

import { getDashboardData as getUserData } from '@/app/server/dashboardstrategy'

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

const local = 'ru-RU'

import { getMockDashboardData } from '@/app/server/MockData'
import { saveAIAdvice } from './dashboardai'

export const updateCacheData = async () => {
  //parrallel query with all needed data id's
  console.log('company id ' + 1)

  resultAllIds[1] = await preload(1)
  console.log('updateCacheData checkisavail ' + (await checkIsAvailable(1))) //+ JSON.stringify(db)

  sometext = sometext + 'afteripdatecachedata'
}

export async function preload(id) {
  console.log(id + 'preload id : getDashboardData... ')

  // void evaluates the given expression and returns undefined
  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void
  //https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-and-sequential-data-fetching
  var userData = await getUserData(id)

  sometext = sometext + 'after preload id ' + id

  return userData
}

export const Item = async id => {
  return resultAllIds[id]
}

const resultAllIds = []

var sometext = ''

export const checkIsAvailable = async id => {
  var isAvailable = resultAllIds[id] != null && resultAllIds[id] != undefined && resultAllIds.length >= id - 1

  console.log('|' + sometext + '|')

  console.log(
    id + 'isavail  ' + isAvailable + ' resid ' + resultAllIds[id] + ' resultAllIds.len ' + resultAllIds.length
  )

  return isAvailable
}
