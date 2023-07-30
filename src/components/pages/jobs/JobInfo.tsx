import React, { FC } from 'react'
import { MapPin } from 'lucide-react'
import { getCountryCodeFlag } from '@/lib/utils'
import Image from 'next/image'
import { Icons } from '@/components/ui/Icons'
import companyImg from '@/public/company.jpeg'

interface JobInfoProps {
  company?: {
    name: string
    image: string
  }
  location?: {
    name: string
    code: string
  }
  rangeSalary?: {
    from: string
    to: string
  }
  jobType?: string
}

const JobInfo: FC<JobInfoProps> = ({
  company,
  location = {
    name: 'Japan',
    code: 'JP',
  },
  rangeSalary,
  jobType,
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <p className='flex items-center'>
        {company?.image ? (
          <Image src={company.image} alt='image' className='w-14 h-14 mr-1' />
        ) : (
          <Image
            src={companyImg}
            alt='image'
            width={56}
            height={56}
            className='mr-1 overflow-hidden rounded-md'
          />
        )}

        <span className='text-sm font-semibold border-r pr-2 border-zinc-500'>
          Rust Jobs
        </span>
      </p>
      {jobType ? (
        <p className='pr-2 flex items-center border-r border-zinc-500'>
          {jobType}
        </p>
      ) : null}

      <p className='flex items-center border-r border-zinc-500 pr-2'>
        <span>40</span>
        <span>-</span>
        <span>60</span>
        <span>/hour</span>
      </p>
      <p className='pr-2 flex items-center'>
        <MapPin size={16} className='mr-1' />
        <span className='text-sm mr-1'>{location?.name}</span>
        <span>{getCountryCodeFlag(location?.code as string)}</span>
      </p>
    </div>
  )
}

export default JobInfo
