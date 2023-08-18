import ScreenName from '@/components/ScreenName';
import Editor from '@/components/pages/profile/Editor';
import { authOptions } from '@/lib/Auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import React from 'react';
interface PageProps {
  params: {
    id: string;
  };
}
const Page = async ({ params: { id } }: PageProps) => {
  const session = await getServerSession(authOptions);

  const res = await axios
    .get(`http://localhost:8080/api/v1/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    })
    .then((res) => res?.data);

  return (
    <div className='flex flex-col max-w-7xl max-lg:max-w-5xl max-md:max-w-4xl mx-auto'>
      <ScreenName screenName='profileEdit' />
      <Editor userId={id} profileResponse={res.data} />
    </div>
  );
};

export default Page;
