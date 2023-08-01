import React, { ReactNode } from 'react'
function Session({ children }: { children: ReactNode }) {
  return <SessionProvider>Session</SessionProvider>
}

export default Session
