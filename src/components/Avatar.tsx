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
  const items = [
    {
      key: "1",
      label: <p onClick={() => signOut()}>Sign Out</p>,
    },
    {
      key: "2",
      label: <Link href="/profile">Profile</Link>,
    },
  ];

  return (
    <>
      {src ? (
        <Image src={src} alt="img" />
      ) : (
        <Dropdown menu={{ items }}>
          <div className="h-8 w-8 text-xs bg-gray-500 rounded-full flex flex-shrink-0 items-center justify-center text-white font-semibold cursor-pointer">
            <Icons.user />
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default Avatar;
