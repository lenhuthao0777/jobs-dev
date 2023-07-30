'use client'
import React, { useState } from 'react'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

import { formatTimeToNow, cn } from '@/lib/utils'
import Tags from '@/components/Tags'
import JobInfo from './JobInfo'
import Button from '@/components/ui/Button'
import SkillTags from '@/components/SkillTags'

const JobItem = () => {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div
      className={cn(
        `${isActive ? 'border-red-500' : ''}`,
        'p-5 rounded-xl space-y-2 bg-white shadow cursor-pointer border-2 transition-all ease-in'
      )}
      onClick={() => setIsActive(!isActive)}
    >
      <Tags type={[1, 2, 3]} />
      <div className='flex items-center'>
        <div className='flex flex-col'>
          <Link className='text-xl font-semibold' href='/'>
            Senior Software Engineer
          </Link>
          <JobInfo />
        </div>
      </div>
      <SkillTags
        skills={[
          'Reactjs',
          'Golang',
          'SQL',
          'Nodejs',
          'AWS',
          'CI/CD',
          'HTML',
          'CSS',
          'Rust',
          'MySql',
        ]}
      />
      <div className='flex items-center text-sm justify-between'>
        <p className='flex items-center'>
          <Calendar size={14} className='mr-1' />
          <span className='mr-1'>{formatTimeToNow(new Date())}</span>
        </p>
        <span className='flex items-center text-green-600 text-sm font-semibold'>
          12 applicants
        </span>
      </div>
    </div>
  )
}

export default JobItem
