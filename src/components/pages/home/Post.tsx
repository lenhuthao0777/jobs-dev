import React from 'react';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';
const Post = () => {
  return (
    <div className='overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
      <div className='px-6 py-4 bg-emerald-100'>
        <p className=' font-semibold py-3 flex items-center gap-1.5'>
          {/* <HomeIcon className='w-4 h-4' /> */}
          Home
        </p>
      </div>
      <div className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
        <div className='flex justify-between gap-x-4 py-3'>
          <p className='text-zinc-500'>
            Your personal reddit home page. Come here to check in with your
            favorite communities.
          </p>
        </div>

        <Link
          className={buttonVariants({ className: 'w-full mt-4 mb-6' })}
          href='/'
        >
          Create community
        </Link>
      </div>
    </div>
  );
};

export default Post;
