import React, { FC } from "react";
import { Icons } from "./ui/Icons";
import Image from "next/image";
import { Dropdown } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface AvatarProps {
  src?: string;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <>
      {src ? (
        <Image src={src} alt="img" />
      ) : (
        <div className="text-xs bg-gray-500 rounded-full flex flex-shrink-0 items-center justify-center text-white font-semibold cursor-pointer">
          <Icons.user className="w-6 h-6" />
        </div>
      )}
    </>
  );
};

export default Avatar;
