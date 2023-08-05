import React from 'react'
import {
  MapPin,
  Calendar,
  Briefcase,
  Users,
  ArrowUpRightFromCircle,
} from 'lucide-react'

import JobItem from './JobItem'
import { formatTimeToNow } from '@/lib/utils'
import Button from '@/components/ui/Button'
import CompanyInfo from '../company/CompanyInfo'

const Jobs = () => {

  return (
    <div className='flex space-x-2'>
      <div className='w-[40%] flex flex-col space-y-2'>
        <JobItem />
      </div>

      <div className='w-[60%] bg-white rounded-xl shadow p-5 space-y-2'>
        <h2 className='text-xl max-md:text-lg max-sm:text-md font-extrabold'>
          Senior Software Engineer
        </h2>

        <div className='flex items-center text-xs'>
          <MapPin size={12} className='mr-1' />
          <span>Tokyo, Japan</span>
        </div>

        <div className='flex items-center text-xs'>
          <Calendar size={12} className='mr-1' />
          <span className='mr-1'>{formatTimeToNow(new Date())}</span>
          <span> . 38 applicants</span>
        </div>

        <div className='flex items-center text-xs'>
          <Briefcase size={12} className='mr-1' />
          <span className='mr-1'>Full-time . </span>
          <span>Middle-Senior level</span>
        </div>

        <div className='flex items-center text-xs'>
          <Users size={12} className='mr-1' />
          <span>1,001-5,000 employees · Staffing and Recruiting</span>
        </div>

        <div className='flex items-center pt-5'>
          <Button size='sm' className='mr-3 rounded-2xl px-5'>
            Apply
            <ArrowUpRightFromCircle size={16} className='ml-1' />
          </Button>
          <Button size='sm' variant='outline' className='px-5 rounded-2xl'>
            Save
          </Button>
        </div>

        <CompanyInfo />
      </div>
    </div>
  )
}

export default Jobs
