"use client";
import React, { FC, useEffect } from "react";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import Link from "next/link";
import { TProfile } from "@/types/globalType";
import { useRouter } from "next/navigation";

interface PageProps {
  id: string;
  profile: TProfile;
}

const Profile: FC<PageProps> = ({ id, profile }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return (
    <div className="mt-2 bg-white rounded-lg">
      <div className="h-[280px]">
        <div
          className="w-full h-[200px] bg-cover bg-no-repeat rounded-t-lg relative shadow"
          style={{ backgroundImage: `url(${profile?.backgroundImage?.url})` }}
        >
          <div className="absolute top-1/2 left-5 z-[4]">
            {profile.avatar ? (
              <Image
                src={profile?.avatar?.url}
                width={profile?.avatar?.width}
                height={profile?.avatar?.height}
                alt="avatar"
                className="w-40 h-40 rounded-full border"
              />
            ) : (
              <div className="w-40 h-40 bg-white rounded-full shadow flex items-center justify-center">
                <h2>Name</h2>
              </div>
            )}
          </div>
          <div className="cursor-pointer absolute right-2 top-2">
            <Link href={`update/${id}`}>
              <PenIcon className="w-6 h-6 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative p-5 space-y-1">
        <h2 className="text-2xl font-extrabold">{profile.name}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: profile.content as TrustedHTML }}
          className="text-xs text-gray-500"
        ></div>
      </div>
    </div>
  );
};

export default Profile;
