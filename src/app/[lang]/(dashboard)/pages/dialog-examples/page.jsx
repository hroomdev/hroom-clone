'use client' // MUI Imports
import { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import { dbQuizTypeIdx } from '../../../../../../src/app/server/dbMapping'

// React Imports

// Component Imports
//import { BrowserRouter } from 'react-router-dom'

import DialogCreateApp from '@/views/pages/dialog-examples/DialogCreateApp'
import DialogAddCard from '@views/pages/dialog-examples/DialogAddCard'
import DialogAddNewAddress from '@views/pages/dialog-examples/DialogAddNewAddress'
import DialogAuthentication from '@views/pages/dialog-examples/DialogAuthentication'
import DialogEditUserInfo from '@views/pages/dialog-examples/DialogEditUserInfo'
import DialogPaymentMethod from '@views/pages/dialog-examples/DialogPaymentMethod'
import DialogPaymentProviders from '@views/pages/dialog-examples/DialogPaymentProviders'
import DialogPricing from '@views/pages/dialog-examples/DialogPricing'
import DialogReferEarn from '@views/pages/dialog-examples/DialogReferEarn'
import DialogShareProject from '@views/pages/dialog-examples/DialogShareProject'

// Data Imports
import { getLastStartedSurvey, getPricingData } from '@/app/server/actions'

import CreateApp from '@components/dialogs/create-app'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/pricing` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */
/* const getPricingData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/pricing`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
} */
var initialState = true

const DialogExamples = () => {
  const [open, setOpen] = useState(initialState)
  const [lastStartedQuizGroupType, setLastStartedGroupType] = useState(0)

  useEffect(() => {
    const f = async () => {
      let currentQuiz = await getLastStartedSurvey()
      var splittedStr = currentQuiz.toString().split(',')
      var quizTypeIdx = await dbQuizTypeIdx()
      var quizTypeGroupId = splittedStr[quizTypeIdx]
      var LastStartedGroupTypeNum = Number.parseInt(quizTypeGroupId)

      setLastStartedGroupType(LastStartedGroupTypeNum)
    }

    f()

    return () => {}
  }, [])

  return (
    lastStartedQuizGroupType != 0 && (
      <CreateApp open={open} setOpen={setOpen} quizGroupTypeId={lastStartedQuizGroupType}></CreateApp>
    )
  )

  //<Grid container spacing={6}>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogAddCard />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogEditUserInfo />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogAuthentication />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogAddNewAddress />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogShareProject />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogReferEarn />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogPaymentMethod />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogPaymentProviders />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogPricing data={data} />
  //  </Grid>
  //  <Grid item xs={12} sm={6} md={4}>
  //    <DialogCreateApp />
  //  </Grid>
  //</Grid>
  //)
}

export default DialogExamples
