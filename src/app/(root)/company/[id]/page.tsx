import Profile from '@/components/pages/profile/Profile';

import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}
const page = async ({ params: { id } }: PageProps) => {
  return <Profile id={id} />;
};

export default page;
