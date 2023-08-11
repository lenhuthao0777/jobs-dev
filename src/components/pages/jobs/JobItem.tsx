"use client";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import Link from "next/link";

import { formatTimeToNow, cn } from "@/lib/utils";
import Tags from "@/components/Tags";
import JobInfo from "./JobInfo";
import Button from "@/components/ui/Button";
import SkillTags from "@/components/SkillTags";

const JobItem = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className={cn(
        `${isActive ? "border border-red-500" : "border-transparent"}`,
        "p-5 rounded-xl space-y-2 bg-white shadow border cursor-pointer transition-all ease-in"
      )}
      onClick={() => setIsActive(!isActive)}
    >
      {/* <Tags type={[1, 2, 3]} /> */}
      <div className="w-full">
          <JobInfo />
      </div>
    </div>
  );
};

export default JobItem;
