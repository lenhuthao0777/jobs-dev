import React from 'react'
import Tags from '@/components/Tags'
const Companies = () => {
  return (
    <div className='flex flex-col'>
      <div className='bg-white rounded-lg w-full p-5 space-y-2'>
        <Tags type={[2, 3]} />
      </div>
    </div>
  )
}

export default Companies
