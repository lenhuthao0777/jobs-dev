import React from 'react'
import Jobs from '@/components/pages/jobs/Jobs'
import Companies from '@/components/pages/jobs/Companies'

function Page() {
  return (
    <>
      {/* Jobs */}
      <h2 className='text-2xl font-extrabold mx-auto w-full my-5 flex items-center justify-center'>
        Featured Jobs
      </h2>
      <Jobs />

      {/* Companies */}
      {/* <h2 className='text-2xl font-extrabold mx-auto w-full my-5 flex items-center justify-center'>
        Companies
      </h2>
      <Companies /> */}
    </>
  )
}

export default Page
