"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import Link from "next/link";
import { TProfile } from "@/types/globalType";
import { useMutation } from "@tanstack/react-query";
import ProfileModel from "@/models/profile";

interface PageProps {
  id: string;
}

const Profile: FC<PageProps> = ({ id }) => {
  const [initialProfileData, setInitialProfileData] = useState<TProfile>({
    id: "",
    name: "",
    avatar: {
      url: "",
      width: 0,
      height: 0,
    },
    backgroundImage: {
      url: "",
      width: 0,
      height: 0,
    },
    summary: "",
    contact: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    userId: "",
  });

  const { isLoading, mutate: handleGetProfile } = useMutation({
    mutationFn: async () => {
      const res = await ProfileModel.list({ id });
      setInitialProfileData(res.data);
    },
  });

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <div className="relative">
      <div className="mt-2 bg-white rounded-lg">
        <div className="h-[280px]">
          <div
            className="w-full h-[200px] bg-cover bg-center bg-no-repeat object-cover rounded-t-lg relative shadow"
            style={{
              backgroundImage: `url(${initialProfileData?.backgroundImage?.url})`,
            }}
          >
            <div className="absolute top-1/2 left-5 z-[4]">
              {initialProfileData.avatar?.url ? (
                <Image
                  src={initialProfileData?.avatar?.url as string}
                  width={initialProfileData?.avatar?.width}
                  height={initialProfileData?.avatar?.height}
                  alt="avatar"
                  className="w-40 h-40 rounded-full border object-cover"
                />
              ) : (
                <div className="w-40 h-40 bg-white rounded-full shadow flex items-center justify-center">
                  <h2>Name</h2>
                </div>
              )}
            </div>
            <div className="cursor-pointer absolute right-2 top-2">
              <Link href={`update/${id}`}>
                <PenIcon className="w-6 h-6 text-gray-700" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative p-5 space-y-1">
          <h2 className="text-2xl font-extrabold">{initialProfileData.name}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: initialProfileData.summary as TrustedHTML,
            }}
            className="[&>ol]:ml-10 [&>ol>li]:list-decimal [&>ul]:ml-10 [&>ul>li]:list-disc [&>h2]:text-lg [&>h2]:font-extrabold"
          ></div>
        </div>
      </div>

      <div className="mt-5 p-5 bg-white shadow rounded-lg">
        <div
          dangerouslySetInnerHTML={{
            __html: initialProfileData.content as TrustedHTML,
          }}
          className="[&>p>a]:text-blue-500 [&>p>a]:font-semibold [&>ol]:ml-10 [&>ol>li]:list-decimal [&>ul]:ml-10 [&>ul>li]:list-disc [&>h2]:text-lg [&>h2]:font-extrabold"
        ></div>
      </div>
    </div>
  );
};

export default Profile;
