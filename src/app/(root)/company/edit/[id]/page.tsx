import ScreenName from '@/components/ScreenName';
import Editor from '@/components/pages/profile/Editor';
import { authOptions } from '@/lib/Auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import React, { Fragment } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params: { id } }: PageProps) => {
  const session = await getServerSession(authOptions);

  const res = await axios
    .get(`http://localhost:8080/api/v1/company/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    })
    .then((res) => res.data);

  return (
    <Fragment>
      <ScreenName screenName='companyEdit' />
      <Editor userId={id} profileResponse={res.data} />
    </Fragment>
  );
};

export default page;
