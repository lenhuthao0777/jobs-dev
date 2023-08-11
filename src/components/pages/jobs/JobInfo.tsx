"use client";
import React, { FC, Fragment } from "react";
import { MapPin, DollarSign, Building, Calendar } from "lucide-react";
import { formatTimeToNow, getCountryCodeFlag } from "@/lib/utils";
import Image from "next/image";
import { Icons } from "@/components/ui/Icons";
import companyImg from "@/public/company.jpeg";

interface JobInfoProps {}

const JobInfo: FC<JobInfoProps> = ({}) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-2">
        <Image
          src={companyImg}
          alt="image"
          width={56}
          height={56}
          className="rounded-md"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <h2 className="text-xl font-semibold">Software Engineer</h2>
        <div className="flex items-center">
          <Building size={14} className="mr-1" />
          <span className="text-sm font-semibold">JAC Vietnam</span>
        </div>
        <div className="flex items-center">
          <DollarSign size={14} className="mr-1" />
          <span>$350 - $600</span>
        </div>
        <div className="flex items-center">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm mr-1">Japan</span>
          <span>{getCountryCodeFlag('JP')}</span>
        </div>
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          <span className="text-sm">{formatTimeToNow(new Date())}</span>
        </div>
      </div>
    </div>
  );
};

export default JobInfo;
