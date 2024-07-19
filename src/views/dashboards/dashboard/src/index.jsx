'use client'

import React from 'react'

import ReactDOMClient from 'react-dom/client'

import { DashboardBuilder } from './screens/DashboardBuilder'

const app = document.getElementById('app')
const root = ReactDOMClient.createRoot(app)

root.render(<DashboardBuilder />)
