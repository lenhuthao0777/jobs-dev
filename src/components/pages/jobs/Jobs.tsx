import React, { Fragment } from 'react';

import JobItem from './JobItem';
import JobInfo from './JobInfo';
import Search from '../jobs/Search';

const Jobs = () => {
  return (
    <div>
      <Search />
      <div className='flex space-x-2 mt-5'>
        <div className='w-[40%] max-lg:w-full flex flex-col space-y-2'>
          <JobItem />
        </div>

        <div className='w-[60%] max-lg:hidden bg-white rounded-xl shadow p-5'>
          <JobInfo />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
