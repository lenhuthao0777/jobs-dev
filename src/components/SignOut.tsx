"use client";
import React, { FC } from "react";
import { signOut } from "next-auth/react";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface PageProps {
  session: any;
}
const SignOut: FC<PageProps> = ({ session }) => {
  const router = useRouter();
  const handleSignOut = async () => {
    const res = await signOut({ redirect: false });
    if (res.url) {
      Cookies.remove('accessToken')
      router.push("/signin");
    }
  };
  return (
    <div className="cursor-pointer transition-all ease-in hover:text-gray-500">
      {session ? (
        <div onClick={handleSignOut} className="flex items-center px-1">
          <LogOut width={24} height={24} />
          <span className="ml-2 text-sm font-semibold max-lg:hidden">Sign Out</span>
        </div>
      ) : (
        <Link href="/signin" className="flex items-center px-1">
          <LogIn width={24} height={24} />
          <span className="ml-2 text-sm font-semibold max-lg:hidden">Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default SignOut;
