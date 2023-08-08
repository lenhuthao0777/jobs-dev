import React from "react";
import Profile from "@/components/pages/profile/Profile";
import ScreenName from "@/components/ScreenName";
import ProfileModel from "@/models/profile";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: PageProps) => {
  const res = await ProfileModel.list({ id });

  if (!res.data) {
    return <div>data is empty</div>
  }  

  return (
    <div className="max-w-7xl max-xl:max-w-6xl max-lg:max-w-5xl max-md:max-w-4xl mx-auto">
      <ScreenName />
      <Profile profile={res?.data} id={id} />
    </div>
  );
};

export default Page;
