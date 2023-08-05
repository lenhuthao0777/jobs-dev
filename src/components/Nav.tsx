'use client'
import React from 'react'
import Logo from './Logo'
import Avatar from './Avatar'
import Button, { buttonVariants } from './ui/Button'
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const session = useSession()
  const path = usePathname()
  const list = ['Home', 'Jobs', 'Posts', 'Companies']

  if (path.includes('signin') || path.includes('signup')) return null

  return (
    <div className='flex items-center fixed top-0 left-0 right-0 w-full h-20 bg-white shadow'>
      <div className='container mx-auto px-4 max-sm:px-6 flex items-center justify-between py-6 space-x-6'>
        <div className='flex flex-1'>
          <Logo/>
        </div>

        <ul className='flex items-center space-x-10 max-md:hidden max-sm:hidden'>
          {list.map((item) => (
            <li
              key={item}
              className='list-none p-4 font-semibold overflow-hidden rounded-md border-2 border-transparent transition-all ease-in cursor-pointer hover:border-gray-400 hover:text-gray-500'
            >
              {item}
            </li>
          ))}
        </ul>

        <div className='flex items-center justify-end space-x-8'>
          {
            session.data ? <Avatar/> :
              <Link href='/signin' className={buttonVariants({ variant: 'default' })}>Sign In</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Nav
