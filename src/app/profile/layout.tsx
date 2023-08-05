import { ReactNode } from 'react'
import Session from "@/providers/Session";

export default function JobsLayout({ children }: { children: ReactNode }) {
  return (
    <Session>
      <div className='flex mt-5 space-x-2'>
        <div className='w-[60%]'>
          {children}
        </div>
        <div className='w-[40%]'>
          <div>test</div>
        </div>
      </div>
    </Session>
  )
}

