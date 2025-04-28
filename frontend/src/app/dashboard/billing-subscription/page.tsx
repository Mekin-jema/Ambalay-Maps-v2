import BillingSubscription from '@/components/dashboard/billing-subscription/billing-subscription'
import Header from '@/components/layout/header'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
          <Header/>
      <BillingSubscription />
    </div>
  )
}

export default page