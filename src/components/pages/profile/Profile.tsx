"use client";
import React from "react";
import avatar from "@/public/next.svg";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="">
      <div className="h-[280px]">
        <div className="w-full h-[200px] bg-slate-400 relative">
          <div className="absolute top-1/2 left-5 z-[4]">
            <Image
              src={avatar}
              alt="avatar"
              className="w-40 h-40 rounded-full border"
            />
          </div>
        </div>
      </div>

      <div className="relative p-5 space-y-1">
        <h2 className="text-2xl font-extrabold">Hao (Hào) Le Nhut</h2>
        <p>Front End Developer(ReactJS - VueJS)</p>
        <p className="text-gray-500">Ho Chi Minh City, Vietnam</p>
      </div>
    </div>
  );
};

export default Profile;
