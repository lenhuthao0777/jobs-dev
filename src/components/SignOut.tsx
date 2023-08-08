"use client";
import React, { FC } from "react";
import { signOut } from "next-auth/react";
import { LogOut, LogIn } from "lucide-react";
import Link from "next/link";

interface PageProps {
  session: any;
}
const SignOut: FC<PageProps> = ({ session }) => {  
  return (
    <div className="cursor-pointer transition-all ease-in hover:text-gray-500">
      {session ? (
        <div onClick={() => signOut()} className="flex items-center px-1">
          <LogOut className="w-6 h-6" />
          <span className="ml-2 text-sm font-semibold">Sign Out</span>
        </div>
      ) : (
        <Link href="/signin" className="flex items-center px-1">
          <LogIn className="w-6 h-6" />
          <span className="ml-2 text-sm font-semibold">Sign In</span>
        </Link>
      )}
    </div>
  );
};

export default SignOut;
