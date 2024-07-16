/**
 * ! The server actions below are used to fetch the static data from the fake-db. If you're using an ORM
 * ! (Object-Relational Mapping) or a database, you can swap the code below with your own database queries.
 */
'use server'

// Data Imports

// db.js

import { connect } from 'react-redux'

import { db as eCommerceData } from '@/fake-db/apps/ecommerce'
import { db as academyData } from '@/fake-db/apps/academy'
import { db as vehicleData } from '@/fake-db/apps/logistics'
import { db as invoiceData } from '@/fake-db/apps/invoice'
import { db as userData } from '@/fake-db/apps/user-list'
import { db as permissionData } from '@/fake-db/apps/permissions'
import { db as profileData } from '@/fake-db/pages/user-profile'
import { db as faqData } from '@/fake-db/pages/faq'
import { db as pricingData } from '@/fake-db/pages/pricing'
import { db as statisticsData } from '@/fake-db/pages/widget-examples'
import { db as questionsData } from '@/fake-db/pages/quiz'

const { Client } = require('pg')

const connectionString = '...'

const client = new Client({
  user: 'gen_user',
  host: '147.45.227.55',
  database: 'default_db',
  password: 'j6ukvvX(SS0#&5',
  port: 5432
})

//also import questiontype
export const clientStatus = async (selectedOptions, timeStart, type) => {
  //await client.connect()
  //const query = {
  //  // give the query a unique name
  //  text: 'SELECT "public"."question-list"."Question" as question FROM public."question-list" WHERE id = 1',
  //  rowMode: 'array'
  //}
  //
  //const res = await client.query(query)
  //return res.rows[0]

  const text = 'INSERT INTO "public"."qa"(selectedOptions, timeStart,type) VALUES($1, $2, $3) RETURNING *'
  const values = [selectedOptions, timeStart, type]

  const res = await client.query(text, values)

  console.log(res.rows[0])

  return res.rows[0]
}

export const getEcommerceData = async () => {
  return eCommerceData
}

export const getAcademyData = async () => {
  return academyData
}

export const getLogisticsData = async () => {
  return vehicleData
}

export const getInvoiceData = async () => {
  return invoiceData
}

export const getUserData = async () => {
  return userData
}

export const getPermissionsData = async () => {
  return permissionData
}

export const getProfileData = async () => {
  return profileData
}

export const getFaqData = async () => {
  return faqData
}

export const getPricingData = async () => {
  return pricingData
}

export const getStatisticsData = async () => {
  return statisticsData
}

export const getQuestData = async () => {
  return questionsData
}
