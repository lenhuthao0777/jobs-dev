import React from 'react'
import { Icons } from './ui/Icons'
import Link from 'next/link'

function Logo() {
  return (
    <Link href='/'>
      <div className='flex items-center cursor-pointer'>
        <p className='text-2xl max-md:text-xl leading-10 tracking-tight font-extrabold text-transparent bg-clip-text mr-1 bg-gradient-to-r from-zinc-900 to-gray-500'>
          Jobs
        </p>
        <Icons.logo className='h-10 w-10' />
      </div>
    </Link>
  )
}

export default Logo
