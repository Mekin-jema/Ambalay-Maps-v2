"use cleint"

import AnalyticsLogs from '@/components/dashboard/analytic-logs/analytics-logs'
import Header from '@/components/layout/header'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
          <Header/>
      <AnalyticsLogs/>
      </div>
  )
}

export default page