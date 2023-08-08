"use client";
import { ScreenNames } from "@/enums";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
import Button from "./ui/Button";
import { ArrowLeftToLine } from "lucide-react";

interface PageProps {
  screenName?: string;
}
const ScreenName: FC<PageProps> = ({ screenName = "default" }) => {
  const router = useRouter();

  return (
    <div className="bg-white p-5 mb-2 rounded-lg flex items-center justify-between shadow">
      <h2 className="text-xl max-xl:text-lg max-lg:text-lg font-extrabold">
        {ScreenNames[screenName as keyof typeof ScreenNames]}
      </h2>
      <Button size="sm" onClick={() => router.back()}>
        <ArrowLeftToLine className="w-4 h-4 mr-1" />
        Back
      </Button>
    </div>
  );
};

export default ScreenName;
