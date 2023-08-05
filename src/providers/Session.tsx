'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
function Session({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}

export default Session
