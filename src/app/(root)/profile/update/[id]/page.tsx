import ScreenName from "@/components/ScreenName";
import Editor from "@/components/pages/profile/Editor";
import ProfileModel from "@/models/profile";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}
const Page = async ({ params: { id } }: PageProps) => {
  const res = await ProfileModel.list({ id });

  if (!res.data) {
    return <div>Data is empty</div>
  }

  return (
    <div className="flex flex-col max-w-7xl max-lg:max-w-5xl max-md:max-w-4xl mx-auto">
      <ScreenName screenName="profileEdit" />
      <Editor profile={res.data} id={res?.data?.id} userId={id}/>
    </div>
  );
};

export default Page;
