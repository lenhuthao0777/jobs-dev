'use client';
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { MapPin, DollarSign, Building } from 'lucide-react';

import { formatTimeToNow, cn } from '@/lib/utils';
import { getCountryCodeFlag } from '@/lib/utils';
import companyImg from '@/public/company.jpeg';

const JobItem = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className={cn(
        `${isActive ? 'border border-red-500' : 'border-transparent'}`,
        'p-5 rounded-xl space-y-2 bg-white shadow border cursor-pointer transition-all ease-in'
      )}
      onClick={() => setIsActive(!isActive)}
    >
      <div className='w-full'>
        <div className='flex'>
          <div className='flex-shrink-0 mr-2'>
            <Image
              src={companyImg}
              alt='image'
              width={56}
              height={56}
              className='rounded-md'
            />
          </div>

          <div className='flex flex-col space-y-1'>
            <h2 className='text-xl font-semibold'>Software Engineer</h2>
            <div className='flex items-center'>
              <Building size={14} className='mr-1' />
              <span className='text-sm font-semibold'>JAC Vietnam</span>
            </div>
            <div className='flex items-center'>
              <DollarSign size={14} className='mr-1' />
              <span>$350 - $600</span>
            </div>
            <div className='flex items-center'>
              <MapPin size={14} className='mr-1' />
              <span className='text-sm mr-1'>Japan</span>
              <span>{getCountryCodeFlag('JP')}</span>
            </div>
            <div className='flex items-center'>
              <Calendar size={14} className='mr-1' />
              <span className='text-sm'>{formatTimeToNow(new Date())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
