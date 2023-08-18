import React from "react";
import Profile from "@/components/pages/profile/Profile";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params: { id } }: PageProps) => {
  return (
    <div className="max-w-7xl max-xl:max-w-6xl max-lg:max-w-5xl max-md:max-w-4xl mx-auto">
      <Profile id={id} />
    </div>
  );
};

export default Page;
