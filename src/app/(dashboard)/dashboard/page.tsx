import React from 'react';
import { session } from "@/lib/auth";

const Page = async () => {
  const data = await session()


  return (
    <div>
      Dashboard page
    </div>
  );
};

export default Page;
