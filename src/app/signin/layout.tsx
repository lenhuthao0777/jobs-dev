import { ReactNode } from 'react'
import Session from "@/providers/Session";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <Session>
      {children}
    </Session>
  )
}

