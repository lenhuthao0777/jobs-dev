import React from 'react';
import Profile from "@/components/pages/profile/Profile";


interface PageProps {
  params: {
    id: string
  }
}

const Page = async ({ params: { id } }: PageProps) => {
  return (
    <div className='bg-white rounded-lg w-full overflow-hidden'>
      <Profile/>
    </div>
  );
};

export default Page;
