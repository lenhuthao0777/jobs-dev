import React, { FC } from "react";
import { Icons } from "./ui/Icons";
import Image from "next/image";
import Link from "next/link";

interface AvatarProps {
  src?: string;
}

const Avatar: FC<AvatarProps> = ({ src }) => {
  return (
    <>
      {src ? (
        <Image
          src={src}
          width={24}
          height={24}
          alt="img"
          className="rounded-full object-cover w-6 h-6"
        />
      ) : (
        <div className="text-xs bg-gray-500 rounded-full flex flex-shrink-0 items-center justify-center text-white font-semibold cursor-pointer">
          <Icons.user className="w-4 h-4" />
        </div>
      )}
    </>
  );
};

export default Avatar;
