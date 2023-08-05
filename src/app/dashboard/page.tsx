import React from 'react';
import { session } from "@/lib/auth";
import { notFound } from "next/navigation";

const Page = async () => {
  const data = await session()

  if (data?.user.role !== 'admin') return notFound()

  return (
    <div>
      Dashboard page
    </div>
  );
};

export default Page;
