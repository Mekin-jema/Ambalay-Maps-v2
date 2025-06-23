// @ts-nocheck
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const { user, token, fetchUser } = useAuthStore()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        router.push('/auth/login')
        return
      }

      try {
        if (!user) {
          await fetchUser()
        }
        setChecked(true)
      } catch {
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [token, user])

  if (!checked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
